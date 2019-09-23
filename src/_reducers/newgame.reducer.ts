import { GameStatus } from '../_types/';
import { GameState } from '../_types/GameState';

const initialState: GameState = {
  gameStatus: GameStatus.INIT,
  players: [],
  homeTeam: null,
  awayTeam: null,
  homeScore: 0,
  awayScore: 0,
  gameEvents: []
 };

export const newgame = (state = initialState, action: any) => {

  if(action.type === 'ADD_PLAYER') {
    const players = [...state.players, action.player]
    return {
      ...state, players
    }
  }

  return state;
}
