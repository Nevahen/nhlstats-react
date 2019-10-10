import { Avatar, Col, Icon, List, Select } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateEvent as updateEventAction } from '../../_actions/match.actions';
import { GameEventTypes, IGameEvent, ITeamUser } from '../../_types';
import { AppState } from '../../App';

type IEditableEventState = {
  editing: boolean;
  eventUpdate: EventUpdate;
}

type EventUpdate = {
  player_id?: number;
  event_type?: number;
  team?: number;
}

export const EditableEventItem = (props: { event: IGameEvent }) => {

  const [itemState, updateState] = useState<IEditableEventState>({ editing: false, eventUpdate: {} });
  const { currentMatch } = useSelector((state: AppState) => state.matchStore)
  const dispatch = useDispatch();


  const getTeamLogo = () => {

    if(props.event.event_type !== GameEventTypes.PERIOD) {
      const team = props.event.team ? '_homeTeam' : '_awayTeam';
      return <Avatar shape="square" src={'/assets/nhl/' + currentMatch![team].shortname + '.gif'} />
    } else {
      return null
    }
  } 

  const getMessage = (event: IGameEvent) => {
    const user = currentMatch!.players.find(player => player.id === event.player_id);
    let didWhat = '';

    if(event.event_type === GameEventTypes.PERIOD) {

      let period;
      const realPeriod = event.period! + 1

      switch(realPeriod) {
        case  4:
          period = 'Overtime';
          break;
        case  5:
          period = 'Shootout';
          break;
        default:
          period = 'Period ' + realPeriod;
      }


      return <div style={{fontWeight: 700}}>{ period }</div>
    }

    switch(event.event_type) {
      case GameEventTypes.GOAL:
        didWhat = 'scored a goal';
        break;
      case GameEventTypes.MAJOR_PENALTY:
        didWhat = 'took major penalty';
        break;
      case GameEventTypes.MINOR_PENALTY:
        didWhat = 'took minor penalty';
        break;
      default:
        didWhat = 'something is broken o.O'
    }

    return (
      <Col span={20}> <span style={{fontWeight: 600}}>{ user && user.username }</span> { didWhat } </Col>
    )
  }

  const editView = () => {

    const handleEventUpdate = (value: string | number | undefined, key: string) => {

      let updateObj = { ...itemState.eventUpdate, [key]:value }
      if(key === 'player_id') {
        updateObj.team = currentMatch!.players.find((player):player is ITeamUser => player.id === value)!.team;
      }

      updateState({...itemState, eventUpdate: updateObj })
    }
    return (
      <Col span={18}>
        <Select onChange={(e: string | number | undefined) => handleEventUpdate(e, 'player_id')} style={{width: 200}} defaultValue={props.event.player_id}>
          {currentMatch!.players.map(player => (
            <Select.Option value={ player.id }>{player.username}</Select.Option>
          ))}
        </Select>
        <Select onChange={(e: string | number | undefined) => handleEventUpdate(e, 'event_type')} style={{width: 200}} defaultValue={props.event.event_type}>
          <Select.Option value={GameEventTypes.GOAL}>Goal</Select.Option>
          <Select.Option value={GameEventTypes.MINOR_PENALTY}>Minor Penalty</Select.Option>
          <Select.Option value={GameEventTypes.MAJOR_PENALTY}>Major Penalty</Select.Option>
        </Select>
      </Col>
    )
  }

  const isEditable = (event: IGameEvent) => {
    const allowedGameEvents = [
      GameEventTypes.GOAL,
      GameEventTypes.MINOR_PENALTY,
      GameEventTypes.MAJOR_PENALTY,
    ]

    return allowedGameEvents.includes(event.event_type);
  }

  const updateEvent = () => {
    let changed = false;
    const updatedEvent = itemState.eventUpdate

    for(let key in updatedEvent) {
      if(props.event[key as keyof IGameEvent] !== updatedEvent[key as keyof EventUpdate]) {
        changed = true;
        break;
      }
    }

    if(changed) {
      dispatch(updateEventAction(props.event.id as number, updatedEvent))
    }

    updateState({ ...itemState, editing: false });

  }

  if(itemState.editing) {

    return (
      <List.Item style={{display: 'flex', justifyContent: 'space-between'}}>
        {editView()}
        <Col span={2} style={{display: 'flex', justifyContent: 'space-between'}}>
          <Icon onClick={updateEvent} type="check" />
          <Icon onClick={() => updateState({ ...itemState, editing: false, eventUpdate: {} })} type='close' />
        </Col>
      </List.Item>
    )
  } else {
    return (
    <List.Item style={{display: 'flex', justifyContent: 'space-between'}}>
    { getTeamLogo() } { getMessage(props.event) } { isEditable(props.event) && 
        <Col span={2}>
          <Icon onClick={() => updateState({...itemState, editing: true})} type='edit' />
        </Col> }
    </List.Item>
    )
  }

}