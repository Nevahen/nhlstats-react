import React from 'react';
import { connect } from 'react-redux';

const PlayerList = (props: {players: { name: string, id: number}[] } ) => (
  <ul className="player--list">
    { props.players.map(player => (
       <li>{ player.name }</li>
      )
    )}
  </ul>
)

const mapStateToProps = (state: any) => ({
  players: state.newgame.players,
})

export default connect(mapStateToProps)(PlayerList)