import { Player, Game } from '../types';

interface Props {
  players: Player[];
  games: Game[];
}

export default function Leaderboard({ players, games }: Props) {
  const totals: Record<string, number> = {};
  games.forEach(g => {
    g.winnerIds.forEach(id => {
      totals[id] = (totals[id] || 0) + 1;
    });
  });

  const sorted = [...players].sort((a, b) => (totals[b.id] || 0) - (totals[a.id] || 0));

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Leaderboard</h1>
      <ol className="list-decimal list-inside">
        {sorted.map(p => (
          <li key={p.id}>{p.name} — {totals[p.id] || 0} wins</li>
        ))}
      </ol>
    </div>
  );
}
