import './GameContainer.css';

import React from 'react';
import { connect } from 'react-redux';

import { addPlayer, gameEvent } from '../_actions/game.actions';
import { fetchTeams, startSelectTeam } from '../_actions/team.actions';
import { GameEventTypes, IGameEvent } from '../_types/GameEvent';
import { GameState } from '../_types/GameState';
import { TeamStore } from '../_types/TeamStore';
import UserActions from '../_actions/user.actions';
import { AppState } from '../App';
import PlayerList from '../components/Game/PlayerList';
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
}

interface IGameContainerState {
  step: string;
}

class GameContainer extends React.Component<IGameContainerProps, IGameContainerState> {

  constructor(props: IGameContainerProps) {
    super(props);
    this.state = {
      step: 'player_select',
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
    this.props.startSelectTeam(selectFor);
  }
  
  render() { 

    switch(this.state.step) {

      case 'player_select': {
        return <PlayerSelector />
      }

      case 'team_select': {
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
              <button onClick={() => { this.props.gameEvent( { type: GameEventTypes.GOAL, team: 1, player: 1 }) }} >Goal</button>
              <button onClick={() => { this.props.gameEvent( { type: GameEventTypes.PERIOD }) }}> Next period</button>
          </div>
            <TeamSelector/>
        </div>
      )
      }
    }
  };
};

const mapActionsToProps = {
  addPlayer: addPlayer,
  gameEvent: gameEvent,
  fetchTeams: fetchTeams,
  fetchUsers: UserActions.fetchUsers,
  startSelectTeam: startSelectTeam,
}

const mapStateToProps = (state: AppState ) => ({
  gamestate: state.newgame,
  teams: state.teamStore
})

export default connect(mapStateToProps, mapActionsToProps)(GameContainer)