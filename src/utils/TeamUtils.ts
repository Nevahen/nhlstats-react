import { IUser } from '../_types/UserStore';

export const mapTeamPlayers = (players: IUser[], team: 0 | 1) => {
  return players.filter((player: any) => {
      return player.team === team;
    })
}