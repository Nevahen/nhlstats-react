import { GameStatus } from '../_types/';
import { GameState } from '../_types/GameState';

const initialState: GameState = {
  gameStatus: GameStatus.INIT,
  players: [],
  homeTeam: null,
  awayTeam: null,
  homeScore: 0,
  awayScore: 0,
  gameEvents: [],
  selectingTeam: false,
  selectingTeamFor: 0,
 };

export const newgame = (state = initialState, action: any) => {

  if(action.type === 'ADD_PLAYER') {
    const players = [...state.players, action.player]
    return {
      ...state, players
    }
  }

  if(action.type === 'GAME_EVENT') {
    const gameEvents = [...state.gameEvents, action.event]
    return {
      ...state, gameEvents
    }
  }

  if(action.type === 'NEW_PERIOD') {
    return {
      ...state, gameStatus: state.gameStatus + 1
    }
  }

  if(action.type === 'GAME_END') {
    return {
      ...state, gameStatus: GameStatus.END
    }
  }

  if(action.type === 'SELECT_TEAM') {
    const targetTeam = action.target ? 'homeTeam' : 'awayTeam';
    return {
      ...state, [targetTeam]: action.teamID, selectingTeam: false,
    }
  }

  if(action.type === 'START_SELECT_TEAM') {
    return {
      ...state, selectingTeamFor: action.target, selectingTeam: true,
    }
  }

  if(action.type === 'ASSIGN_PLAYER') {

    return {
      ...state, players: state.players.map(player => 
        player.id === action.playerId ? {...player, team: action.team } : player
      )
    }
  }

  if(action.type === 'REMOVE_PLAYER') {
    return {
      ...state, players: state.players.filter(player => player.id !== action.id)
    }
  }

  if(action.type === 'GAME_GOAL') {
    const targetTeam = action.team ? 'homeScore' : 'awayScore';
    const score = state[targetTeam] + 1;
    return {
      ...state, [targetTeam]: score
    }
  }

  return state;
}
