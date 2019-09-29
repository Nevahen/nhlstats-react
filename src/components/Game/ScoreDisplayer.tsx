import React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../App';

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
  <div className="score-displayer">
    <h2> { periodName(props.period) } </h2>
    { props.period > 0 && <h2> { props.awayScore } - { props.homeScore }</h2> }
  </div>
);

const mapStateToProps = (state: AppState) => ({
  period: state.newgame.gameStatus,
  awayScore: state.newgame.awayScore,
  homeScore: state.newgame.homeScore,
})

export default connect(mapStateToProps)(ScoreDisplayer);
