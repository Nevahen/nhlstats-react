
export enum GameEventTypes {
  GOAL = 'goal',
  PENALTY = 'penalty',
  PERIOD = 'period',
}

export interface IGameEvent {
  type: GameEventTypes,
  period: number,
  player?: number,
  team?: number,
}