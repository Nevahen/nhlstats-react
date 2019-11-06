import { GameStatus, IGameEvent, GameEventTypes } from '../_types/';
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

  if(action.type === "UNDO_EVENT") {

    const modifiedEvents = state.gameEvents.slice(0, state.gameEvents.length - 1);
    const newStatus = calculateGameState(modifiedEvents);

    return {
      ...state, 
      gameEvents: modifiedEvents,
      scoreHome: newStatus.scoreHome,
      scoreAway: newStatus.scoreAway,
      gameStatus: newStatus.gameStatus,
    }
  }

  return state;
}

/**
 * Computed period and goals from gameEvents
 * @todo Make these values computed.
 * @param events game events
 */
const calculateGameState = (events: IGameEvent[]) => {

  const result = {
    scoreHome: 0,
    scoreAway: 0,
    gameStatus: 0,
  }

  return events.reduce((current: any, event: IGameEvent) => {

    if(event.event_type === GameEventTypes.GOAL) {
      const team = event.team ? 'scoreHome' : 'scoreAway';
      return {
        ...current,
        [team]: current[team] + 1,
      }
    }

    if(event.event_type === GameEventTypes.PERIOD) {
      return {
        ...current,
        gameStatus: current.gameStatus + 1,
      }
    }

    return current;
  }, result)
}