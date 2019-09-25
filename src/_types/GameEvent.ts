
export enum GameEventTypes {
  GOAL = 'goal',
  PENALTY = 'penalty',
  PERIOD = 'period',
}

export interface IGameEvent {
  type: GameEventTypes,
  player?: number,
  team?: number,
  period?: number,
}