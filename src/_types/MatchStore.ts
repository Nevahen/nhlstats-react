
import { IUser } from './UserStore';
import { IGameEvent } from './GameEvent';
import { ITeam } from './ITeam';

export interface MatchStore {
  currentMatch: IMatch & { error?: string } | null;
  fetching: boolean,
  matchList: IMatch[],
}

export interface IMatch {
  id: number,
  homeTeam: number,
  awayTeam: number,
  winnerTeam: 0 | 1,
  scoreHome: number,
  scoreAway: number,
  date: string,
  players: IUser[],
  events: IGameEvent[],
  _homeTeam: ITeam,
  _awayTeam: ITeam,
}