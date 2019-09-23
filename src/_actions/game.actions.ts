
export const addPlayer = (player: { name: string, id: number }) => {
  return {
    type: 'ADD_PLAYER',
    player,
  }
}