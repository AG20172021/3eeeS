export interface Player {
  id: string;
  name: string;
  icon?: string;
  tagline?: string;
  email?: string;
}

export type GameType = 'pool' | 'darts';
export type Mode = '1v1' | '1v1v1' | '2v2';

export interface Game {
  id: string;
  type: GameType;
  mode: Mode;
  playerIds: string[];
  winnerIds: string[];
  date: string;
}
