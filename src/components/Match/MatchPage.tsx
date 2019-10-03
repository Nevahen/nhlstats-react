import { Breadcrumb, Col, Layout, Row, Spin } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { MatchPlayerList} from './MatchPlayerList';
import { fetchMatch } from '../../_actions/match.actions';
import { IMatch, MatchStore } from '../../_types/MatchStore';
import { AppState } from '../../App';
import { TeamDisplayer } from '../Game/TeamDisplayer';
import { Typography} from 'antd';
const { Title } = Typography;

type MatchParams = { id: string | undefined }
type OwnProps = {
  matchStore: MatchStore,
  fetchMatch: Function,
}

export class MatchPageComponent extends React.Component<OwnProps & RouteComponentProps<MatchParams>> {

  componentDidMount = () => {
    this.props.fetchMatch(this.props.match.params.id);
  }

  render = () => {

    const { currentMatch, fetching } = this.props.matchStore;

    if( currentMatch && currentMatch.error) {
      return ( <h1>404</h1> );    
    } else {
      return this.renderDetails(fetching, currentMatch as IMatch)
    }


    return (null)
  }

  renderDetails = (fetching: boolean, match: IMatch) => {
    return (
      <Layout>
        <Breadcrumb style={{margin: '16px 0'}}>
        <Breadcrumb.Item><Link to={'/matches'}>matches</Link></Breadcrumb.Item>
        <Breadcrumb.Item>{this.props.match.params.id}</Breadcrumb.Item>

        </Breadcrumb>
        { fetching && <Spin /> }
        { match && (
          <Layout.Content>
            <Row type="flex" justify="space-between">
              <Col span={8}>
              <TeamDisplayer team={match._awayTeam}/>
              </Col>
              <Col span={4}>
                {match.scoreAway} - {match.scoreHome}
              </Col>
              <Col span={8}>
              <TeamDisplayer team={match._homeTeam}/>
              </Col>
            </Row>
            <Row type="flex" align="middle" justify="center">
              <Title level={3}> Players</Title>
            </Row>
            <Row type="flex" align="middle" justify="center">
              <Col span={8}><MatchPlayerList players={match.players} team={0} /></Col>
              <Col span={8}><MatchPlayerList players={match.players} team={1} /></Col>
            </Row>
          </Layout.Content>

        )
        }
      </Layout>
    )
  }


}

const mapStateToProps = (state: AppState) => ({
  matchStore: state.matchStore,
});

const mapActionToProps = {
  fetchMatch: fetchMatch,
}

export const MatchPage = connect(mapStateToProps, mapActionToProps)(MatchPageComponent)