import { GameEventTypes, IGameEvent } from '../_types/GameEvent';
import { GameState } from '../_types/GameState';

const REGULAR_LAST_PERIOD = 3;

export const addPlayer = (player: { name: string, id: number }) => {
  return {
    type: 'ADD_PLAYER',
    player,
  }
}

export const gameEvent = (event: IGameEvent) => {
  return (dispatch: any, getState: any) => {
    const gameState = getState().newgame as GameState;

    if(event.type === GameEventTypes.PERIOD && gameState.period < REGULAR_LAST_PERIOD) {
      dispatch({
        type: 'NEW_PERIOD',
      })
    }

    // TODO. If overtime and goal, end game.

    dispatch ({
      type: 'GAME_EVENT',
      event
    });
  }
}