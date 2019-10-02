import React from 'react';
import { ITeam } from '../../_types/ITeam';
import { Row, Col } from 'antd';

interface ITeamDisplayerProps {
  team: ITeam | undefined ,
}

export const TeamDisplayer = (props: ITeamDisplayerProps) => (

   props.team ?

    (
      <Row style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
          <img style={ { verticalAlign: "middle", maxWidth: 150}} alt={props.team.name}
              src={'/assets/nhl/' + props.team.shortname + '.gif'} />
          <h2>{ props.team.name }</h2>
      </Row>
    )

    :

    (
      <Row align="middle" type="flex" justify="center">
      <h1>SELECT TEAM</h1>
      </Row>
    )
)
