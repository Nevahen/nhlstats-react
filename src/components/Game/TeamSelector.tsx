import './TeamSelector.css';

import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';

import { selectTeam } from '../../_actions/team.actions';
import { ITeam } from '../../_types/ITeam';
import { AppState } from '../../App';
import { TeamDisplayer } from './TeamDisplayer';

interface TeamSelectorProps {
  teams: ITeam[];
  selectingFor: number,
  selectTeam: Function;
  selectingTeam: boolean;
}

const printSelectedTeam = (teams: ITeam[], id:number) => {
  const team =  teams.find(team => team.id === id)
  return team;
} 

const TeamSelectorComponent = (props: TeamSelectorProps) => {

  const [selectedTeam, selectTeam] = useState(3);
  const selectingFor = useSelector((state: AppState) => state.newgame.selectingTeamFor);

  const selectText = () => {
    return selectingFor ? 'SELECT HOME TEAM' : 'SELECT AWAY TEAM';
  }

  if(!props.selectingTeam) {
    return null;
  }

  return (
    <div className='teamselector__container'>
      <h2>{ selectText() }</h2>
      <div className='teamselector_teamscontainer'>
        { props.teams.map(team => (
          <div onClick={() => selectTeam(team.id)}>
            <TeamDisplayer team={team} />
          </div>
        ))}
      </div>
      <div>
        <h3>selected:</h3>
          { (selectedTeam && printSelectedTeam(props.teams, selectedTeam)) &&
            printSelectedTeam(props.teams, selectedTeam)!.name
          }
        <button onClick={() => props.selectTeam(selectingFor, selectedTeam)} style={{
          display: 'block',
          margin: 'auto',
        }}>OKEY</button>
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