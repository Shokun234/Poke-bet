import React, { useState, useEffect } from 'react';
import { fetchPokemonData } from '../../utils/pokeApi';
import { ROLL_DICE, resolveClash } from '../../game/clashRoll';
import { applyDiceManipulators } from '../../game/abilities';
const BossNode = ({ gym, activePokemon, onWin, onLose }) => {
  const [bossPokemon, setBossPokemon] = useState(null);
  const [result, setResult] = useState(null);
  useEffect(() => { const loadBoss = async () => { const data = await fetchPokemonData(gym.pokemonId); setBossPokemon(data); }; loadBoss(); }, [gym]);
  const handleBattle = (allIn) => {
    let pRoll = ROLL_DICE(); let eRoll = ROLL_DICE();
    const manipulated = applyDiceManipulators(activePokemon, pRoll, eRoll);
    const clash = resolveClash(activePokemon.stats.atk, manipulated.finalRoll, bossPokemon.stats.def, manipulated.finalEnemyRoll);
    setResult(clash);
    if (clash.playerWon) setTimeout(() => onWin(gym), 1500); else setTimeout(() => onLose(gym, allIn), 1500);
  };
  if (!bossPokemon) return <div className="p-4 text-center">Boss approaching...</div>;
  return (
    <div className="p-4 bg-slate-800 border-4 border-red-600 rounded text-center">
      <h2 className="text-2xl text-red-500 mb-4">{gym.name}</h2>
      <div className="flex justify-around items-center mb-6"><img src={activePokemon.sprite} className="w-20" /><span>VS</span><img src={bossPokemon.sprite} className="w-20" /></div>
      {!result ? <div className="flex gap-2"><button onClick={() => handleBattle(false)} className="flex-1 bg-blue-600 py-2 rounded">SAFE</button><button onClick={() => handleBattle(true)} className="flex-1 bg-red-600 py-2 rounded">ALL-IN</button></div> : <div className="text-xl font-bold">{result.playerWon ? 'WIN!' : 'LOSE...'}</div>}
    </div>
  );
};
export default BossNode;
