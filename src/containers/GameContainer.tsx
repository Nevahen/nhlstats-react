import './GameContainer.css';

import React from 'react';
import { connect } from 'react-redux';

import { addPlayer } from '../_actions/game.actions';
import { TeamDisplayer } from '../components/Game/TeamDisplayer';
import  PlayerList from '../components/Game/PlayerList';


interface IGameContainerProps {
  addPlayer: Function;
}

const GameContainer = (props: IGameContainerProps) => (


  <div className="game--container">
        <div className="score-displayer">
        <h1>Period 1</h1>
        <h1>1 - 0</h1>
      </div>
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
      </div>
  </div>

);

const mapActionsToProps = {
  addPlayer: addPlayer
}

export default connect(null, mapActionsToProps)(GameContainer)