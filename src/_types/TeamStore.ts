export interface TeamStore {
  teams: ITeam[];
}

export interface ITeam {
  id: number,
  name: string,
  shortname: string,
  league_id: number,
}
