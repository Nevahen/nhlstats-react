import React from 'react';
import { ITeam } from '../../_types/ITeam';

interface ITeamDisplayerProps {
  team: ITeam | null,
}

export const TeamDisplayer = (props: ITeamDisplayerProps) => (

   props.team ?

    (
      <div>
      <img alt={props.team.name}
           src={'/assets/nhl/' + props.team.shortname + '.gif'} />
      <h2>{ props.team.name }</h2>
      </div>
    )

    :

    (
      <div>
      <h1>SELECT TEAM</h1>
      </div>
    )
)
