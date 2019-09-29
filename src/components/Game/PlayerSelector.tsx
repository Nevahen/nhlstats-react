import React from 'react';
import { connect } from 'react-redux';

import { shuffle } from 'lodash';

import { addPlayer, assignPlayer, removePlayer } from '../../_actions/game.actions';
import { GameState } from '../../_types/GameState';
import { AppState } from '../../App';
import { store } from '../../_store/store';

interface IPlayerSelectorProps {
  players: any[];
  addPlayer: Function;
  gameState: GameState;
  assignPlayer: Function;
  removePlayer: Function;
}

const PlayerSelectorElement = (props: IPlayerSelectorProps) => {

  const getAvailablePlayer = () => {
    return props.players.filter(player => !props.gameState.players.find(subject => player.id === subject.id))
  }

  const randomizePlayers = () => {
    const tempArr = shuffle(props.gameState.players)
    for(let i = 0; i < tempArr.length; i++) {
      let team = i < Math.floor(tempArr.length / 2) ? 0 : 1;
      props.assignPlayer(tempArr[i].id, team)
    }
  }

  return (
    <div>
      <ul>
        { getAvailablePlayer().map(player => (<li onClick={() => props.addPlayer({...player, team: null})} key={player.id}>{player.username}</li>) )}
      </ul>
      <TeamPlayers removePlayer={props.removePlayer} assignPlayer={props.assignPlayer} title="Away" team={0} />
      <TeamPlayers removePlayer={props.removePlayer} assignPlayer={props.assignPlayer} title="Unassigned" team={null} />
      <TeamPlayers removePlayer={props.removePlayer} assignPlayer={props.assignPlayer} title="Home" team={1} />

      <div>
        <button onClick={randomizePlayers}>Randomize Teams</button>
        <button>START</button>
      </div>
    </div>
  )
}

const getTeamPlayers = (team: number | null) => {
  const players = store.getState().newgame.players;
  return players.filter(player => player.team === team);
}

const TeamPlayers = (props: {
  title: string,
  team: 0 | 1 | null,
  assignPlayer: Function,
  removePlayer: Function,
} ) => (
  <div>
    <h3>{props.title}</h3>
    { getTeamPlayers(props.team).map(player => (
     <li key={player.id}>
        { player.username }
        <button onClick={ () => props.assignPlayer(player.id, 0) }>AWAY</button>
        <button onClick={ () => props.assignPlayer(player.id, 1) }>HOME</button>
        <button onClick={ () => props.removePlayer(player.id) }>REMOVE</button>
      </li> 
    ))}
  </div>
);

const stateToProps = (state: AppState ) => ({
  players: state.userStore.users,
  gameState: state.newgame,
})

const mapActionToProps = {
  addPlayer: addPlayer,
  assignPlayer: assignPlayer,
  removePlayer: removePlayer,
}

connect(stateToProps, mapActionToProps)(TeamPlayers);
export const PlayerSelector = connect(stateToProps, mapActionToProps)(PlayerSelectorElement);