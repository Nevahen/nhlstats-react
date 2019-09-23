import { GameStatus } from "./GameStatus";

export interface GameState {
  gameStatus: GameStatus,
  players: any[],
  homeTeam: number | null
  awayTeam: number | null,
  homeScore: number,
  awayScore: number,
  gameEvents: [],
}