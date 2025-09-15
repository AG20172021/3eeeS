import { describe, it, expect, beforeEach } from 'vitest';
import { loadPlayers, savePlayers } from './storage';

beforeEach(() => {
  localStorage.clear();
});

describe('storage', () => {
  it('returns empty array when no players saved', () => {
    expect(loadPlayers()).toEqual([]);
  });

  it('saves and loads players', () => {
    const players = [{ id: '1', name: 'Alice' }];
    savePlayers(players);
    expect(loadPlayers()).toEqual(players);
  });
});
