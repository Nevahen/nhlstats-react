import { GameStatus } from '../_types/';
import { GameState } from '../_types/GameState';

const initialState: GameState = {
  gameStatus: GameStatus.INIT,
  players: [],
  homeTeam: null,
  awayTeam: null,
  scoreHome: 0,
  scoreAway: 0,
  gameEvents: [],
  selectingTeam: false,
  selectingTeamFor: 0,
  playerSelectEvent: null,
  showPlayerSelect: false,
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
      ...state, gameEvents, playerSelectEvent: null, showPlayerSelect: false,
    }
  }

  if(action.type === 'PLAYER_SELECT') {
    return {
      ...state, playerSelectEvent: action.event, showPlayerSelect: true,
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
    const targetTeam = action.team ? 'scoreHome' : 'scoreAway';
    const score = state[targetTeam] + 1;
    return {
      ...state, [targetTeam]: score
    }
  }

  return state;
}
