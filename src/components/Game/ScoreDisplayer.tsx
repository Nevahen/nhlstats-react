import React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../App';
import { Col } from 'antd';

interface ScoreDisplayerProps {
  period: number,
  homeScore: number,
  awayScore: number,
}

const periodName = (period: number) => {
  switch(period) {
    case 1: 
      return 'Period 1'
      case 2: 
    return 'Period 2'
      case 3: 
    return 'Period 3'
      case 4: 
    return 'Overtime'
      case 5: 
    return 'Shootout'
  }
}

const ScoreDisplayer = (props: ScoreDisplayerProps) => (
  <Col>
    <h2> { periodName(props.period) } </h2>
    { props.period > 0 && <div><h2 className="text-center"> { props.awayScore } - { props.homeScore }</h2></div> }
  </Col>
);

const mapStateToProps = (state: AppState) => ({
  period: state.newgame.gameStatus,
  awayScore: state.newgame.scoreAway,
  homeScore: state.newgame.scoreHome,
})

export default connect(mapStateToProps)(ScoreDisplayer);
