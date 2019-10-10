import { List, Col } from 'antd';
import { shuffle } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import { addPlayer, assignPlayer, removePlayer } from '../../_actions/game.actions';
import { store } from '../../_store/store';
import { GameState } from '../../_types/GameState';
import { AppState } from '../../App';
import { Button } from 'antd';

interface IPlayerSelectorProps {
  players: any[];
  addPlayer: Function;
  gameState: GameState;
  assignPlayer: Function;
  removePlayer: Function;
  nextStep: Function;
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
      <div className="available__list">
        { getAvailablePlayer().map(player => (<Button className="playerlist__item" onClick={() => props.addPlayer({...player, team: null})} key={player.id}>{player.username}</Button>) )}
      </div>
      <TeamPlayers removePlayer={props.removePlayer} assignPlayer={props.assignPlayer} title="Away" team={0} />
      <TeamPlayers removePlayer={props.removePlayer} assignPlayer={props.assignPlayer} title="Unassigned" team={null} />
      <TeamPlayers removePlayer={props.removePlayer} assignPlayer={props.assignPlayer} title="Home" team={1} />

      <div>
        <Button onClick={randomizePlayers}>Randomize Teams</Button>
        <Button onClick={() => props.nextStep()}>START</Button>
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
 
        <List      
          className="teamplayers__list" 
          bordered
          style={{
            marginBottom: '5px'
          }}
          header={<div>{props.title}</div>}
          dataSource={getTeamPlayers(props.team)}
          locale={{ emptyText: ' '}}
          renderItem={player => (
            <List.Item style={{justifyContent: 'space-between'}}>
              <Col xs={24} sm={8}><span className="playerlist__name"> { player.username } </span> </Col>
              <div>
                <Button onClick={ () => props.assignPlayer(player.id, 0) }>A</Button>
                <Button onClick={ () => props.assignPlayer(player.id, 1) }>H</Button>
                <Button type="danger" onClick={ () => props.removePlayer(player.id) }>REMOVE</Button>
              </div>
            </List.Item> 
          )
        }/>
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