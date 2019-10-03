import { Button, Col, Modal, notification, Row } from 'antd';
import React from 'react';
import { connect } from 'react-redux';

import { addPlayer, endGame, gameEvent, playerSelect } from '../_actions/game.actions';
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
          <Row type="flex" justify="center">
            <ScoreDisplayer />
          </Row>
        
          <Row type="flex" justify="center">
            <Col span={12} onClick={() => this.startSelectTeam(0)}>
              <TeamDisplayer team={this.getTeam(this.props.gamestate.awayTeam)} />
              <Row type="flex" justify="center">
                <TeamControls playerSelect={this.props.playerSelect} gameEvent={this.props.gameEvent} team={0} />
              </Row>
            </Col>
            <Col span={12} onClick={() => this.startSelectTeam(1)}>
              <TeamDisplayer team={this.getTeam(this.props.gamestate.homeTeam)} />
              <Row type="flex" justify="center">
                <TeamControls playerSelect={this.props.playerSelect} gameEvent={this.props.gameEvent} team={1} />
              </Row>
            </Col>
          </Row>

          <Modal visible={this.props.gamestate.showPlayerSelect}>

          { this.props.gamestate.playerSelectEvent && mapTeamPlayers(this.props.gamestate.players, this.props.gamestate.playerSelectEvent!.team as 0 | 1).map(player => (
            <Button onClick={() => this.props.gameEvent({ ...this.props.gamestate.playerSelectEvent!, player_id: player.id })}>{player.username}</Button>
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
      <div>
        <Button disabled={!canMoveToNextPeriod()} onClick={() => { props.gameEvent( { event_type: GameEventTypes.PERIOD }) }}>Next period</Button>
        { showEndGame() && <Button onClick={() => props.endGame()}>End game</Button>}
      </div>
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
      props.gameEvent({ ...event, player: players[0].id })
    } else {
      props.playerSelect(event);
    }

    notification.open({
      message: 'ok',
    });

    // props.gameEvent(event);
  }

  if(gameStatus >= GameStatus.FIRST_PERIOD && gameStatus <= GameStatus.SHOOTOUT) {
    return (
      <div>
      <Button onClick={() => handleButtonClick({ event_type: GameEventTypes.GOAL, team: props.team })}>Goal</Button>
      <Button onClick={() => handleButtonClick({ event_type: GameEventTypes.MINOR_PENALTY, team: props.team })} >Minor Penalty</Button>
      <Button onClick={() => handleButtonClick({ event_type: GameEventTypes.MAJOR_PENALTY, team: props.team })} >Major Penalty</Button>

      </div>
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
}

const mapStateToProps = (state: AppState ) => ({
  gamestate: state.newgame,
  teams: state.teamStore
})

export default connect(mapStateToProps, mapActionsToProps)(GameContainer)