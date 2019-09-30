import { GameStatus } from '../_types/';
import { GameEventTypes, IGameEvent } from '../_types/GameEvent';
import { GameState } from '../_types/GameState';
import { AppState } from '../App';
import Axios from '../Axios';

export const addPlayer = (player: { name: string, id: number }) => {
  return {
    type: 'ADD_PLAYER',
    player,
  }
}

export const assignPlayer = (playerId: number, team: number) => {
  return {
    type: 'ASSIGN_PLAYER',
    team,
    playerId,
  }
}

export const removePlayer = (id: number) => {
  return {
    type: 'REMOVE_PLAYER',
    id,
  }
}

export const gameEvent = (event: IGameEvent) => {
  return (dispatch: any, getState: any) => {
    const gameState = getState().newgame as GameState;

    if(event.event_type === GameEventTypes.PERIOD && gameState.gameStatus < GameStatus.SHOOTOUT) {
      dispatch({
        type: 'NEW_PERIOD',
      })
    }

    if(event.event_type === GameEventTypes.GOAL) {
      dispatch({
        type: 'GAME_GOAL',
        team: event.team,
      })
    }

    // TODO. If overtime and goal, end game.

    dispatch ({
      type: 'GAME_EVENT',
      event: { ...event, period: gameState.gameStatus}
    });
  }
}

export const endGame = () => {
  return async (dispatch: any, getState: () => AppState) => {

    const { 
      players,
      scoreAway,
      awayTeam,
      scoreHome,
      homeTeam,
      gameEvents
    } = getState().newgame;

    const playersModified = players.map(player => {
      return {...player, ["#dbRef"]: player.id }
    })

    const payload = {
      scoreAway,
      awayTeam,
      scoreHome,
      homeTeam,
      events: gameEvents,
      players: playersModified,
      winnerTeam: scoreHome > scoreAway ? 1 : 0,
    }

    try {
    await Axios.post('/matches', payload);
    } catch (error) {
      //console.log(error);
    }

    dispatch({
      type: 'GAME_END'
    });

  }
}