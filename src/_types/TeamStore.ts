export interface TeamStore {
  teams: ITeam[];
}

export interface ITeam {
  id: number,
  name: string,
  shortnam: string,
  league_id: number,
}
