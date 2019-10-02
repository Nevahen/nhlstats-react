import { Layout, Typography, List } from 'antd';
import { shuffle } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import { addPlayer, assignPlayer, removePlayer } from '../../_actions/game.actions';
import { store } from '../../_store/store';
import { GameState } from '../../_types/GameState';
import { AppState } from '../../App';
import { Button } from 'antd';

const { Title } = Typography;

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
      <ul className="available__list">
        { getAvailablePlayer().map(player => (<Button className="playerlist__item" onClick={() => props.addPlayer({...player, team: null})} key={player.id}>{player.username}</Button>) )}
      </ul>
      <TeamPlayers removePlayer={props.removePlayer} assignPlayer={props.assignPlayer} title="Away" team={0} />
      <TeamPlayers removePlayer={props.removePlayer} assignPlayer={props.assignPlayer} title="Unassigned" team={null} />
      <TeamPlayers removePlayer={props.removePlayer} assignPlayer={props.assignPlayer} title="Home" team={1} />

      <div>
        <button onClick={randomizePlayers}>Randomize Teams</button>
        <button onClick={() => props.nextStep()}>START</button>
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
  <Layout>
      <Layout.Content>
        <List       
          bordered 
          header={<div>{props.title}</div>}
          dataSource={getTeamPlayers(props.team)}
          locale={{ emptyText: ' '}}
          renderItem={player => (
            <List.Item style={{justifyContent: 'space-between'}}>
              <span className="playerlist__name"> { player.username } </span>
              <div>
                <Button onClick={ () => props.assignPlayer(player.id, 0) }>AWAY</Button>
                <Button onClick={ () => props.assignPlayer(player.id, 1) }>HOME</Button>
                <Button type="danger" onClick={ () => props.removePlayer(player.id) }>REMOVE</Button>
              </div>
            </List.Item> 
          )
        }/>
      </Layout.Content>
  </Layout>
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