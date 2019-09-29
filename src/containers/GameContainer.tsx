import './GameContainer.css';

import React from 'react';
import { connect } from 'react-redux';

import { addPlayer, gameEvent } from '../_actions/game.actions';
import { fetchTeams, startSelectTeam } from '../_actions/team.actions';
import { GameEventTypes, IGameEvent } from '../_types/GameEvent';
import { GameState } from '../_types/GameState';
import { TeamStore } from '../_types/TeamStore';
import { AppState } from '../App';
import PlayerList from '../components/Game/PlayerList';
import ScoreDisplayer from '../components/Game/ScoreDisplayer';
import { TeamDisplayer } from '../components/Game/TeamDisplayer';
import { TeamSelector } from '../components/Game/TeamSelector';

interface IGameContainerProps {
  addPlayer: Function;
  gameEvent: (event: IGameEvent) => void;
  fetchTeams: Function;
  gamestate: GameState;
  teams: TeamStore;
  startSelectTeam: Function;
}

class GameContainer extends React.Component<IGameContainerProps> {

  public componentWillMount() {
    this.props.fetchTeams()
  }

  private getTeam = (id: number | null) => {
    return this.props.teams.teams.find(team => team.id === id);
  }

  private startSelectTeam = (selectFor: number) => {
    this.props.startSelectTeam(selectFor);
  }
  
  render() { 
    return (
      <div className="game--container">
          <ScoreDisplayer />
        <div className="teams--container">
        <div onClick={() => this.startSelectTeam(0)}>
          <TeamDisplayer team={this.getTeam(this.props.gamestate.awayTeam)} />
        </div>
        <div onClick={() => this.startSelectTeam(1)}>
          <TeamDisplayer team={this.getTeam(this.props.gamestate.homeTeam)} />
        </div>
        </div>

        <div>
            Players:
            <PlayerList />
            Add Player:
            <input onClick={() => { this.props.addPlayer({name:"osku", id:2})}} type="text" />


            <button onClick={() => { this.props.gameEvent( { type: GameEventTypes.GOAL, team: 1, player: 1 }) }} >Goal</button>
            <button onClick={() => { this.props.gameEvent( { type: GameEventTypes.PERIOD }) }}> Next period</button>

          </div>
          <TeamSelector/>
      </div>
    )
  };
};

const mapActionsToProps = {
  addPlayer: addPlayer,
  gameEvent: gameEvent,
  fetchTeams: fetchTeams,
  startSelectTeam: startSelectTeam,
}

const mapStateToProps = (state: AppState ) => ({
  gamestate: state.newgame,
  teams: state.teamStore
})

export default connect(mapStateToProps, mapActionsToProps)(GameContainer)