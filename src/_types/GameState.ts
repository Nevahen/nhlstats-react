import { GameStatus } from "./GameStatus";
import { IGameEvent } from "./GameEvent";

export interface GameState {
  gameStatus: GameStatus,
  players: any[],
  homeTeam: number | null
  awayTeam: number | null,
  homeScore: number,
  awayScore: number,
  gameEvents: IGameEvent[],
  selectingTeam: boolean,
  selectingTeamFor: 0 | 1;
}