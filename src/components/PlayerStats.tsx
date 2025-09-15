import { useParams } from 'react-router-dom';
import { Player, Game, GameType } from '../types';

interface Props {
  players: Player[];
  games: Game[];
}

export default function PlayerStats({ players, games }: Props) {
  const { id } = useParams();
  const player = players.find(p => p.id === id);
  if (!player) return <div className="p-4">Player not found.</div>;

  const played = games.filter(g => g.playerIds.includes(player.id));
  const wins = played.filter(g => g.winnerIds.includes(player.id));
  const losses = played.length - wins.length;

  const winByType: Record<GameType, number> = { pool: 0, darts: 0 };
  wins.forEach(g => { winByType[g.type]++; });

  return (
    <div className="p-4 space-y-2">
      <h1 className="text-2xl mb-4">{player.name}</h1>
      <p>Wins: {wins.length}</p>
      <p>Losses: {losses}</p>
      <div>
        <h2 className="text-xl mt-4 mb-2">Wins by Game</h2>
        <ul className="list-disc list-inside">
          <li>Pool: {winByType.pool}</li>
          <li>Darts: {winByType.darts}</li>
        </ul>
      </div>
    </div>
  );
}
