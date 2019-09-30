
export enum GameEventTypes {
  PERIOD = 0,
  GOAL = 1,
  PENALTY = 2,
}

export interface IGameEvent {
  event_type: GameEventTypes,
  player_id?: number,
  team?: number,
  period?: number,
}