import { GameEventTypes, IGameEvent } from '../_types/GameEvent';
import { GameState } from '../_types/GameState';

export const addPlayer = (player: { name: string, id: number }) => {
  return {
    type: 'ADD_PLAYER',
    player,
  }
}

export const gameEvent = (event: IGameEvent) => {
  return (dispatch: any, getState: any) => {
    const gameState = getState().newgame as GameState;

    if(event.type === GameEventTypes.PERIOD && gameState.period < 3) {
      dispatch({
        type: 'NEW_PERIOD',
      })
    }

    dispatch ({
      type: 'GAME_EVENT',
      event
    });
  }
} 