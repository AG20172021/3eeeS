import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player, Game, GameType, Mode } from '../types';

interface Props {
  players: Player[];
  addGame: (g: Game) => void;
}

const playerCounts: Record<Mode, number> = {
  '1v1': 2,
  '1v1v1': 3,
  '2v2': 4,
};

const winnerCounts: Record<Mode, number> = {
  '1v1': 1,
  '1v1v1': 1,
  '2v2': 2,
};

export default function GameForm({ players, addGame }: Props) {
  const [type, setType] = useState<GameType>('pool');
  const [mode, setMode] = useState<Mode>('1v1');
  const [selected, setSelected] = useState<string[]>([]);
  const [winners, setWinners] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggle = (id: string, arr: string[], set: (v: string[]) => void) => {
    set(arr.includes(id) ? arr.filter(x => x !== id) : [...arr, id]);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selected.length !== playerCounts[mode]) return;
    if (winners.length !== winnerCounts[mode]) return;
    const game: Game = {
      id: crypto.randomUUID(),
      type,
      mode,
      playerIds: selected,
      winnerIds: winners,
      date: new Date().toISOString(),
    };
    addGame(game);
    navigate('/');
  };

  return (
    <form onSubmit={onSubmit} className="p-4 space-y-4">
      <h1 className="text-2xl">New Game</h1>
      <div className="space-y-2">
        <label className="block">Game</label>
        <select value={type} onChange={e => setType(e.target.value as GameType)} className="border p-2">
          <option value="pool">Pool</option>
          <option value="darts">Darts</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="block">Mode</label>
        <select value={mode} onChange={e => { setMode(e.target.value as Mode); setSelected([]); setWinners([]); }} className="border p-2">
          <option value="1v1">1v1</option>
          <option value="1v1v1">1v1v1</option>
          <option value="2v2">2v2</option>
        </select>
      </div>
      <div>
        <p className="mb-2">Players ({selected.length}/{playerCounts[mode]})</p>
        <div className="flex flex-wrap gap-2">
          {players.map(p => (
            <label key={p.id} className="flex items-center gap-1">
              <input type="checkbox" checked={selected.includes(p.id)} onChange={() => toggle(p.id, selected, setSelected)} />
              {p.name}
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2">Winner(s) ({winners.length}/{winnerCounts[mode]})</p>
        <div className="flex flex-wrap gap-2">
          {selected.map(id => {
            const p = players.find(x => x.id === id)!;
            return (
              <label key={id} className="flex items-center gap-1">
                <input type="checkbox" checked={winners.includes(id)} onChange={() => toggle(id, winners, setWinners)} />
                {p.name}
              </label>
            );
          })}
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Save</button>
    </form>
  );
}
