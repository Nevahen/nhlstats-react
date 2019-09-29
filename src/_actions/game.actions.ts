import { GameStatus } from '../_types/';
import { GameEventTypes, IGameEvent } from '../_types/GameEvent';
import { GameState } from '../_types/GameState';

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

export const gameEvent = (event: IGameEvent) => {
  return (dispatch: any, getState: any) => {
    const gameState = getState().newgame as GameState;

    if(event.type === GameEventTypes.PERIOD && gameState.gameStatus < GameStatus.THIRD_PERIOD) {
      dispatch({
        type: 'NEW_PERIOD',
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
  return {
    type: 'GAME_END',
  }
}