import React from 'react';
import { IUser } from '../../_types/UserStore';
import { List } from 'antd';
import { mapTeamPlayers } from '../../utils/TeamUtils';

interface Props {
  players: IUser[], 
  team: 0 | 1,
}


export const MatchPlayerList = (props: Props) => (
  <List dataSource={mapTeamPlayers(props.players, props.team)}
    renderItem={item => (
      <List.Item>{item.username}</List.Item>
    )}
  />
)

