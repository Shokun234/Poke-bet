import React, { useState, useEffect } from 'react';
import { fetchPokemonData, getRandomKantoId } from '../../utils/pokeApi';
import { ROLL_DICE, calculatePower } from '../../game/clashRoll';
const CatchNode = ({ activePokemon, onCatch, onLeave }) => {
  const [wildPokemon, setWildPokemon] = useState(null);
  const [status, setStatus] = useState('searching');
  useEffect(() => { const search = async () => { const id = getRandomKantoId(); const data = await fetchPokemonData(id); setWildPokemon(data); setStatus('encountered'); }; search(); }, []);
  const attemptCatch = () => {
    const pRoll = ROLL_DICE(); const eRoll = ROLL_DICE();
    if (calculatePower(activePokemon.stats.atk, pRoll) > calculatePower(wildPokemon.stats.def, eRoll)) { setStatus('caught'); onCatch(wildPokemon); }
    else setStatus('fled');
  };
  if (!wildPokemon) return <div className="p-4 text-center">Searching...</div>;
  return (
    <div className="p-4 bg-slate-700 border-2 border-green-500 rounded text-center">
      <img src={wildPokemon.sprite} className="mx-auto w-32 h-32" />
      <p className="capitalize font-bold">{wildPokemon.name}</p>
      {status === 'encountered' ? <button onClick={attemptCatch} className="w-full bg-green-600 py-2 rounded mt-4">CATCH</button> : <button onClick={onLeave} className="w-full bg-slate-600 py-2 rounded mt-4">CONTINUE</button>}
    </div>
  );
};
export default CatchNode;
