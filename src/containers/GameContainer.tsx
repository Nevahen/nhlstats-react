import './GameContainer.css';

import React from 'react';
import { connect } from 'react-redux';

import { addPlayer, gameEvent, endGame } from '../_actions/game.actions';
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

interface IGameContainerProps {
  addPlayer: Function;
  gameEvent: (event: IGameEvent) => void;
  fetchTeams: Function;
  fetchUsers: Function;
  gamestate: GameState;
  teams: TeamStore;
  startSelectTeam: Function;
  endGame: Function;
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
            <ScoreDisplayer />
          <div className="teams--container">
          <div onClick={() => this.startSelectTeam(0)}>
            <TeamDisplayer team={this.getTeam(this.props.gamestate.awayTeam)} />
            <TeamControls gameEvent={this.props.gameEvent} team={0} />
          </div>
          <div onClick={() => this.startSelectTeam(1)}>
            <TeamDisplayer team={this.getTeam(this.props.gamestate.homeTeam)} />
            <TeamControls gameEvent={this.props.gameEvent} team={1} />
          </div>
          </div>

          { (this.props.gamestate.gameStatus === 0) 
            ? <StartControls gameEvent={this.props.gameEvent}/>
            : <GameControls endGame={this.props.endGame} gameEvent={this.props.gameEvent} /> 
          }
            <TeamSelector/>
        </div>
      )
      }
    }
  };
};

const StartControls = (props: {gameEvent: Function}) => {
  const { homeTeam, awayTeam } = store.getState().newgame;
  return (
    <button disabled={ !homeTeam || !awayTeam } 
      onClick={() => { props.gameEvent( { type: GameEventTypes.PERIOD }) }
    }> START GAME</button>
  )
}

const GameControls = (props: {gameEvent: Function, endGame: Function}) => {

  const showEndGame = (): boolean => {
    const { gameStatus, homeScore, awayScore } = store.getState().newgame;
    if(gameStatus >= GameStatus.THIRD_PERIOD && homeScore !== awayScore) {
      return true;
    } 

    return false;
  }

  const canMoveToNextPeriod = ():boolean => {

    const { gameStatus, homeScore, awayScore } = store.getState().newgame;
    switch(true) {

      case ((gameStatus === GameStatus.THIRD_PERIOD || gameStatus === GameStatus.OVERTIME) && homeScore == awayScore): {
        return true;
      }

      case gameStatus < GameStatus.THIRD_PERIOD:
        return true;

      default:
        return false;
    }
  }

  return (
    <div>
      <button disabled={!canMoveToNextPeriod()} onClick={() => { props.gameEvent( { type: GameEventTypes.PERIOD }) }}>Next period</button>
      { showEndGame() && <button onClick={() => props.endGame()}>End game</button>}
    </div>
  )
}

const TeamControls = (props: { gameEvent: Function, team: number }) => {
  return (
    <div>
    <button onClick={() => { props.gameEvent( { type: GameEventTypes.GOAL, team: props.team, player: 1 }) }} >Goal</button>
    </div>
  )
}

const mapActionsToProps = {
  addPlayer: addPlayer,
  gameEvent: gameEvent,
  fetchTeams: fetchTeams,
  fetchUsers: UserActions.fetchUsers,
  startSelectTeam: startSelectTeam,
  endGame: endGame,
}

const mapStateToProps = (state: AppState ) => ({
  gamestate: state.newgame,
  teams: state.teamStore
})

export default connect(mapStateToProps, mapActionsToProps)(GameContainer)