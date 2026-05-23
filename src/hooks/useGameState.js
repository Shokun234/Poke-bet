import { useState, useEffect } from 'react';

const INITIAL_STATE = {
  chips: 100,
  team: [],
  pokedex: [],
  badges: [],
  inventory: [],
  currentRoute: 1,
  stats: { wins: 0, losses: 0, totalRolls: 0 }
};

export const useGameState = () => {
  const [gameState, setGameState] = useState(() => {
    const saved = localStorage.getItem('pokeBetSave');
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });

  useEffect(() => {
    localStorage.setItem('pokeBetSave', JSON.stringify(gameState));
  }, [gameState]);

  const addChips = (amount) => setGameState(prev => ({ ...prev, chips: prev.chips + amount }));
  const removeChips = (amount) => setGameState(prev => ({ ...prev, chips: Math.max(0, prev.chips - amount) }));
  const addToTeam = (pokemon) => {
    if (pokemon && gameState.team.length < 6) {
      setGameState(prev => ({ ...prev, team: [...prev.team, { ...pokemon, currentHp: pokemon.stats.hp }] }));
    }
  };
  const updatePokemonHp = (index, newHp) => {
    setGameState(prev => {
      const newTeam = [...prev.team];
      newTeam[index] = { ...newTeam[index], currentHp: Math.max(0, newHp) };
      return { ...prev, team: newTeam };
    });
  };

  return { gameState, addChips, removeChips, addToTeam, updatePokemonHp, setGameState };
};
