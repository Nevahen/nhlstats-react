import './GameContainer.css';

import React from 'react';
import { connect } from 'react-redux';

import { addPlayer, gameEvent } from '../_actions/game.actions';
import { GameEventTypes, IGameEvent } from '../_types/GameEvent';
import PlayerList from '../components/Game/PlayerList';
import ScoreDisplayer from '../components/Game/ScoreDisplayer';
import { TeamDisplayer } from '../components/Game/TeamDisplayer';

interface IGameContainerProps {
  addPlayer: Function;
  gameEvent: (event: IGameEvent) => void;
}

const GameContainer = (props: IGameContainerProps) => (


  <div className="game--container">
      <ScoreDisplayer />
    <div className="teams--container">
      <div>
        <img alt="Legends" src="/assets/nhl/LEG.gif"></img>
        <h2>Legends</h2>
      </div>

    <TeamDisplayer team={null} />
    </div>

    <div>
        Players:
        <PlayerList />
        Add Player:
        <input onClick={() => { props.addPlayer({name:"osku", id:2})}} type="text" />


        <button onClick={() => { props.gameEvent( { type: GameEventTypes.GOAL, period: 1, team: 1, player: 1 }) }} >Goal</button>
        <button onClick={() => { props.gameEvent( { type: GameEventTypes.PERIOD, period: 2 }) }}> Next period</button>

      </div>
  </div>

);

const mapActionsToProps = {
  addPlayer: addPlayer,
  gameEvent: gameEvent
}

export default connect(null, mapActionsToProps)(GameContainer)