import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player } from '../types';

interface Props {
  addPlayer: (p: Player) => void;
}

export default function PlayerForm({ addPlayer }: Props) {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [tagline, setTagline] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const player: Player = {
      id: crypto.randomUUID(),
      name: name.trim(),
      icon: icon || undefined,
      tagline: tagline || undefined,
      email: email || undefined,
    };
    addPlayer(player);
    navigate('/');
  };

  return (
    <form onSubmit={onSubmit} className="p-4 space-y-4">
      <h1 className="text-2xl">New Player</h1>
      <input className="border p-2 w-full" placeholder="Name *" value={name} onChange={e => setName(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Icon URL" value={icon} onChange={e => setIcon(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Tagline" value={tagline} onChange={e => setTagline(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Save</button>
    </form>
  );
}
