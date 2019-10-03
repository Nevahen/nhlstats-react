import { Col, List, Typography, Avatar } from 'antd';
import React from 'react';
import { connect } from 'react-redux';

import { fetchMatches } from '../_actions/match.actions';
import { MatchStore } from '../_types/MatchStore';
import { AppState } from '../App';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

interface IMatchContainer {
  matchStore: MatchStore,
  fetchMatches: Function,
}

class MatchesContainerComponent extends React.Component<IMatchContainer> {

componentWillMount() {
  this.props.fetchMatches();
}

render = () => (
    <List 
    bordered
    itemLayout="horizontal"
    loading={ this.props.matchStore.fetching } 
    dataSource={ this.props.matchStore.matchList } 
    renderItem={match => (
      <Link to={`/matches/${match.id}`}>
        <List.Item>
          <Col span={4}>
            { match.scoreAway } <Avatar shape="square" src={'/assets/nhl/' + match._awayTeam.shortname + '.gif'} /> 
          </Col>
          <Col span={4}>
            { match.scoreHome }   <Avatar shape="square" src={'/assets/nhl/' + match._homeTeam.shortname + '.gif'} />
          </Col>

            { match.date }

        </List.Item>
      </Link>
    )}
    />
 )

}

const mapStateToProps = (state: AppState) =>  ({
  matchStore: state.matchStore,
})

const mapActionToProps = {
  fetchMatches: fetchMatches,
}

export default connect(mapStateToProps, mapActionToProps)(MatchesContainerComponent)