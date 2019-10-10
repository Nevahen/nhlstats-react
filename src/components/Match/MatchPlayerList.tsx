import React from 'react';
import { IUser } from '../../_types/UserStore';
import { List } from 'antd';
import { mapTeamPlayers } from '../../utils/TeamUtils';
import { Typography } from 'antd';
const { Text } = Typography;

interface Props {
  players: IUser[], 
  team: 0 | 1,
}


export const MatchPlayerList = (props: Props) => (
  <List 
    style={{textAlign: 'center'}} 
    header={
      <div style={{fontSize: 18}}>
      { props.team ? 
      <Text strong>Home</Text> : 
      <Text strong>Away</Text> }
      </div>
    }
    dataSource={mapTeamPlayers(props.players, props.team)}
    renderItem={item => (
      <List.Item style={{textAlign: 'center'}}> {item.username}</List.Item>
    )}
  />
)

