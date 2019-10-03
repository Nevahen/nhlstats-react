
export enum GameEventTypes {
  PERIOD = 0,
  GOAL = 1,
  MINOR_PENALTY = 2,
  MAJOR_PENALTY = 3,
}

export interface IGameEvent {
  event_type: GameEventTypes,
  player_id?: number,
  team?: number,
  period?: number,
}