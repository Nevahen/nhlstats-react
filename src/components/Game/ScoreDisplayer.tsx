import React from 'react';
import { connect } from 'react-redux';

interface ScoreDisplayerProps {
  period: number,
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
    <h2> </h2>
  </div>
);

const mapStateToProps = (state: any) => ({
  period: state.newgame.period
})

export default connect(mapStateToProps)(ScoreDisplayer);
