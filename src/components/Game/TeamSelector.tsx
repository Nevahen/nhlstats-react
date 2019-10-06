import './TeamSelector.css';

import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';

import { selectTeam } from '../../_actions/team.actions';
import { ITeam } from '../../_types/ITeam';
import { AppState } from '../../App';
import { TeamDisplayer } from './TeamDisplayer';
import { Input } from 'antd';

interface TeamSelectorProps {
  teams: ITeam[];
  selectingFor: number,
  selectTeam: Function;
  selectingTeam: boolean;
}

const TeamSelectorComponent = (props: TeamSelectorProps) => {

  const selectingFor = useSelector((state: AppState) => state.newgame.selectingTeamFor);
  const [filter, setFilter] = useState('');

  const selectText = () => {
    return selectingFor ? 'SELECT HOME TEAM' : 'SELECT AWAY TEAM';
  }

  if(!props.selectingTeam) {
    return null;
  }

  return (
    <div className='teamselector__container'>
      <h2>{ selectText() }</h2>
      <Input onChange={(e) => setFilter(e.target.value.toLocaleLowerCase()) } type="text" placeholder='Filter'/>
      <div className='teamselector_teamscontainer'>
        { props.teams.filter(team => 
          team.name.toLocaleLowerCase().indexOf(filter) !== -1 ||
          team.shortname.toLocaleLowerCase().indexOf(filter) !== -1
        )
        .map(team => (
          <div key={team.id} onClick={() => props.selectTeam(selectingFor, team.id)}>
            <TeamDisplayer team={team} />
          </div>
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  teams: state.teamStore.teams,
  selectingFor: state.newgame.selectingTeamFor,
  selectingTeam: state.newgame.selectingTeam,
})

const mapActionToProps = {
  selectTeam: selectTeam,
}

export const TeamSelector = connect(mapStateToProps, mapActionToProps)(TeamSelectorComponent);