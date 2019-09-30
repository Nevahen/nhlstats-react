import { GameStatus } from "./GameStatus";
import { IGameEvent } from "./GameEvent";

export interface GameState {
  gameStatus: GameStatus,
  players: any[],
  homeTeam: number | null
  awayTeam: number | null,
  scoreHome: number,
  scoreAway: number,
  gameEvents: IGameEvent[],
  selectingTeam: boolean,
  selectingTeamFor: 0 | 1;
}