import React from 'react';
import { IUser } from '../../_types/UserStore';
import { List } from 'antd';

interface Props {
  players: IUser[], 
  team: 0 | 1,
}


const mapTeamPlayers = (data: Props) => {
  return data.players.filter((player: any) => {
      return player.team === data.team;
    })
}

export const MatchPlayerList = (props: Props) => (
  <List dataSource={mapTeamPlayers(props)}
    renderItem={item => (
      <List.Item>{item.username}</List.Item>
    )}
  />
)

