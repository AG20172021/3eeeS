import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import PlayerForm from './components/PlayerForm';
import GameForm from './components/GameForm';
import PlayerStats from './components/PlayerStats';
import Leaderboard from './components/Leaderboard';
import { Player, Game } from './types';
import { loadPlayers, savePlayers, loadGames, saveGames } from './storage';

export default function App() {
  const [players, setPlayers] = useState<Player[]>(() => loadPlayers());
  const [games, setGames] = useState<Game[]>(() => loadGames());

  useEffect(() => { savePlayers(players); }, [players]);
  useEffect(() => { saveGames(games); }, [games]);

  const addPlayer = (p: Player) => setPlayers([...players, p]);
  const addGame = (g: Game) => setGames([...games, g]);

  return (
    <Router>
      <nav className="p-4 bg-white shadow mb-4 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/players/new">New Player</Link>
        <Link to="/games/new">New Game</Link>
        <Link to="/leaderboard">Leaderboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home players={players} />} />
        <Route path="/players/new" element={<PlayerForm addPlayer={addPlayer} />} />
        <Route path="/games/new" element={<GameForm players={players} addGame={addGame} />} />
        <Route path="/players/:id" element={<PlayerStats players={players} games={games} />} />
        <Route path="/leaderboard" element={<Leaderboard players={players} games={games} />} />
      </Routes>
    </Router>
  );
}
