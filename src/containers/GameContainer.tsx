import { Button, Col, List, Modal, Row, Icon } from 'antd';
import React from 'react';
import { connect } from 'react-redux';

import { addPlayer, endGame, gameEvent, playerSelect, undoEvent } from '../_actions/game.actions';
import { fetchTeams, startSelectTeam } from '../_actions/team.actions';
import UserActions from '../_actions/user.actions';
import { store } from '../_store/store';
import { GameStatus } from '../_types';
import { GameEventTypes, IGameEvent } from '../_types/GameEvent';
import { GameState } from '../_types/GameState';
import { TeamStore } from '../_types/TeamStore';
import { AppState } from '../App';
import { PlayerSelector } from '../components/Game/PlayerSelector';
import ScoreDisplayer from '../components/Game/ScoreDisplayer';
import { TeamDisplayer } from '../components/Game/TeamDisplayer';
import { TeamSelector } from '../components/Game/TeamSelector';
import { mapTeamPlayers } from '../utils/TeamUtils';

interface IGameContainerProps {
  addPlayer: Function;
  gameEvent: (event: IGameEvent) => void;
  fetchTeams: Function;
  fetchUsers: Function;
  gamestate: GameState;
  teams: TeamStore;
  startSelectTeam: Function;
  endGame: Function;
  playerSelect: Function;
  undoEvent: Function;
}

interface IGameContainerState {
  step: string;
}

class GameContainer extends React.Component<IGameContainerProps, IGameContainerState> {

  constructor(props: IGameContainerProps) {
    super(props);

    const step = props.gamestate.gameStatus > 0 ? 'team_select' : 'player_select';
    this.state = {
      step
    }
  }

  public componentWillMount() {
    this.props.fetchTeams()
    this.props.fetchUsers();
  }

  private getTeam = (id: number | null) => {
    return this.props.teams.teams.find(team => team.id === id);
  }

  private startSelectTeam = (selectFor: number) => {
    if(this.props.gamestate.gameStatus > 0) {
      return;
    }
    this.props.startSelectTeam(selectFor);
  }

  private nextStep = () => {
    switch(this.state.step) {
      case 'player_select':
        this.setState({
          step: 'team_select',
        })
    }
  }
  
  render() { 

    switch(this.state.step) {

      case 'player_select': {
        return <PlayerSelector nextStep={this.nextStep} />
      }

      case 'team_select': {
      return (
        <div className="game--container">
          <Button onClick={() => this.props.undoEvent() } disabled={this.props.gamestate.gameEvents.length <= 1}><Icon type="undo" /></Button>
          <Row type="flex" justify="center">
            <ScoreDisplayer />
          </Row>
        
          <Row type="flex" gutter={12} justify="center">
            <Col span={12} onClick={() => this.startSelectTeam(0)}>
              <TeamDisplayer shortName={true} team={this.getTeam(this.props.gamestate.awayTeam)} />
              <Row type="flex" justify="center">
                <TeamControls playerSelect={this.props.playerSelect} gameEvent={this.props.gameEvent} team={0} />
              </Row>
            </Col>
            <Col span={12} onClick={() => this.startSelectTeam(1)}>
              <TeamDisplayer shortName={true} team={this.getTeam(this.props.gamestate.homeTeam)} />
              <Row type="flex" justify="center">
                <TeamControls playerSelect={this.props.playerSelect} gameEvent={this.props.gameEvent} team={1} />
              </Row>
            </Col>
          </Row>

          <Modal 
            visible={this.props.gamestate.showPlayerSelect}
            footer={null}
          >

          { this.props.gamestate.playerSelectEvent && mapTeamPlayers(this.props.gamestate.players, this.props.gamestate.playerSelectEvent!.team as 0 | 1).map(player => (
            <List.Item>
              <Button onClick={() => this.props.gameEvent({ ...this.props.gamestate.playerSelectEvent!, player_id: player.id })}>{player.username}</Button>
            </List.Item>
          )) }


          </Modal>
          { this.props.gamestate.gameStatus === GameStatus.INIT && <StartControls gameEvent={this.props.gameEvent}/> }
           <GameControls endGame={this.props.endGame} gameEvent={this.props.gameEvent} />                   
           <TeamSelector/>
        </div>
      )
      }
    }
  };
};

const StartControls = (props: { gameEvent: (arg: IGameEvent) => void }) => {
  const { homeTeam, awayTeam } = store.getState().newgame;
  return (
    <Button disabled={ !homeTeam || !awayTeam } 
      onClick={() => { props.gameEvent( { event_type: GameEventTypes.PERIOD }) }
    }> START GAME</Button>
  )
}

const GameControls = (props: {gameEvent: Function, endGame: Function}) => {

  const { gameStatus, scoreHome, scoreAway } = store.getState().newgame;

  const showEndGame = (): boolean => {
    if(gameStatus >= GameStatus.THIRD_PERIOD && scoreHome !== scoreAway) {
      return true;
    } 

    return false;
  }

  const canMoveToNextPeriod = ():boolean => {

    switch(true) {

      case ((gameStatus === GameStatus.THIRD_PERIOD || gameStatus === GameStatus.OVERTIME) && scoreHome === scoreAway): {
        return true;
      }

      case gameStatus < GameStatus.THIRD_PERIOD:
        return true;

      default:
        return false;
    }
  }
  
  if(gameStatus >= GameStatus.FIRST_PERIOD && gameStatus <= GameStatus.SHOOTOUT) {
    return (
      <Row>
        <Col>
        <Button className="button--mobile-big" disabled={!canMoveToNextPeriod()} onClick={() => { props.gameEvent( { event_type: GameEventTypes.PERIOD }) }}>Next period</Button>
        { showEndGame() && <Button className="button--mobile-big" onClick={() => props.endGame()}>End game</Button>}
        </Col>
      </Row>
    )
  } else {
    return null
  }  
}

const TeamControls = (props: { gameEvent: Function, team: number, playerSelect: Function }) => {

  const { gameStatus } = store.getState().newgame;

  const handleButtonClick = (event: IGameEvent) => {

    const players = mapTeamPlayers(store.getState().newgame.players, event.team as 0 | 1);

    if(players.length === 1) {
      props.gameEvent({ ...event, player_id: players[0].id })
    } else {
      props.playerSelect(event);
    }
  }

  if(gameStatus >= GameStatus.FIRST_PERIOD && gameStatus <= GameStatus.SHOOTOUT) {
    return (
      <Row>
        <Col style={{marginBottom: 5}} xs={24}>
            <Button className="button--mobile-big" style={{width: '100%'}} onClick={() => handleButtonClick({ event_type: GameEventTypes.GOAL, team: props.team })}>Goal</Button>
        </Col>
        <Col style={{marginBottom: 5}} xs={24}>
          <Button className="button--mobile-big" style={{width: '100%'}} onClick={() => handleButtonClick({ event_type: GameEventTypes.MINOR_PENALTY, team: props.team })} >Minor Penalty</Button>
        </Col>
        <Col style={{marginBottom: 5}} xs={24}>
          <Button className="button--mobile-big" style={{width: '100%'}} onClick={() => handleButtonClick({ event_type: GameEventTypes.MAJOR_PENALTY, team: props.team })} >Major Penalty</Button>
        </Col>
      </Row>
    )
  } else {
    return null;
  }
}


const mapActionsToProps = {
  addPlayer: addPlayer,
  gameEvent: gameEvent,
  fetchTeams: fetchTeams,
  fetchUsers: UserActions.fetchUsers,
  startSelectTeam: startSelectTeam,
  endGame: endGame,
  playerSelect: playerSelect,
  undoEvent: undoEvent,
}

const mapStateToProps = (state: AppState ) => ({
  gamestate: state.newgame,
  teams: state.teamStore
})

export default connect(mapStateToProps, mapActionsToProps)(GameContainer)