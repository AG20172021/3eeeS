import { Link } from 'react-router-dom';
import { Player } from '../types';

interface Props {
  players: Player[];
}

export default function Home({ players }: Props) {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Players</h1>
      <ul>
        {players.map(p => (
          <li key={p.id} className="mb-2">
            <Link to={`/players/${p.id}`} className="text-blue-600 hover:underline">{p.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
