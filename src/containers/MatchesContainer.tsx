import { Avatar, Col, Divider, Icon, List, Popover, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchMatches } from '../_actions/match.actions';
import { ITeamUser } from '../_types';
import { IMatch, MatchStore } from '../_types/MatchStore';
import { AppState } from '../App';

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
      <List.Item>
      <Link to={`/matches/${match.id}`} style={{width: '100%'}}>

        <Row type="flex" justify="space-between" style={{width: '100%'}} align="middle">
            <Col span={4}>
              { match.scoreAway } <Avatar shape="square" src={'/assets/nhl/' + match._awayTeam.shortname + '.gif'} /> 
            </Col>
            <Col span={4}>
              { match.scoreHome } <Avatar shape="square" src={'/assets/nhl/' + match._homeTeam.shortname + '.gif'} />
            </Col>
            <Col span={12}>
              { match.date }
            </Col>
            <Col>
            <Popover placement="bottom" content={getMatchPlayers(match)}>
              <Icon type="user" />
            </Popover>
            </Col>
        </Row>
        </Link>

      </List.Item>
    )}
    />
 )
}

const getMatchPlayers = (match: IMatch) => {
  console.log(match)
  return (
    <div>
      <Title level={ 4 }>Away <Avatar shape="square" src={'/assets/nhl/' + match._awayTeam.shortname + '.gif'} /> </Title>
      <List 
        dataSource={ match.players.filter(player => (player as ITeamUser).team === 0) }
        renderItem={ item => <List.Item>{ item.username }</List.Item>}
      />

      <Title level={ 4 }>Home <Avatar shape="square" src={'/assets/nhl/' + match._homeTeam.shortname + '.gif'} /> </Title>
      <List 
        dataSource={ match.players.filter(player => (player as ITeamUser).team === 1) }
        renderItem={ item => <List.Item>{ item.username }</List.Item>}
      />
    </div>
  )
}

const mapStateToProps = (state: AppState) =>  ({
  matchStore: state.matchStore,
})

const mapActionToProps = {
  fetchMatches: fetchMatches,
}

export default connect(mapStateToProps, mapActionToProps)(MatchesContainerComponent)