import { Player, Game } from './types';

const PLAYERS_KEY = 'players';
const GAMES_KEY = 'games';

export function loadPlayers(): Player[] {
  const data = localStorage.getItem(PLAYERS_KEY);
  return data ? JSON.parse(data) : [];
}

export function savePlayers(players: Player[]) {
  localStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
}

export function loadGames(): Game[] {
  const data = localStorage.getItem(GAMES_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveGames(games: Game[]) {
  localStorage.setItem(GAMES_KEY, JSON.stringify(games));
}
