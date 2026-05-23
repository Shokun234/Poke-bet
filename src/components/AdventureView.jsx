import React, { useState, useEffect } from 'react';
import { fetchPokemonData, getRandomKantoId } from '../utils/pokeApi';
import { ROLL_DICE, resolveClash } from '../game/clashRoll';
import { applyDiceManipulators, applyPayoutBoosters, applyLossProtection, applyVenusaurHeal } from '../game/abilities';
import { playSound } from '../utils/audio';

const AdventureView = ({ gameState, addChips, removeChips, addToTeam, updatePokemonHp, onEnterGym }) => {
  const [distance, setDistance] = useState(0);
  const [isWalking, setIsWalking] = useState(true);
  const [encounter, setEncounter] = useState(null);
  const [logs, setLogs] = useState(['Started journey...']);

  const activePokemon = gameState.team[0];

  useEffect(() => {
    let timer;
    if (isWalking && activePokemon && activePokemon.currentHp > 0) {
      timer = setInterval(() => {
        setDistance(d => d + 1);
        if (Math.random() < 0.1) triggerEncounter();
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isWalking, activePokemon]);

  const triggerEncounter = async () => {
    setIsWalking(false);
    const data = await fetchPokemonData(getRandomKantoId());
    if (data) {
      setEncounter(data);
    } else {
      setLogs(prev => ['A wild Pokemon fled!', ...prev.slice(0, 3)]);
      setIsWalking(true);
    }
  };

  const handleFight = (allIn) => {
    playSound('roll');
    let pRoll = ROLL_DICE(); let eRoll = ROLL_DICE();
    const manipulated = applyDiceManipulators(activePokemon, pRoll, eRoll);
    const clash = resolveClash(activePokemon.stats.atk, manipulated.finalRoll, encounter.stats.def, manipulated.finalEnemyRoll);

    if (clash.playerWon) {
      playSound('win');
      let baseReward = allIn ? 30 : 10;
      const boosted = applyPayoutBoosters(activePokemon, baseReward, pRoll === eRoll, false);
      addChips(boosted.finalAmount);

      const vHeal = applyVenusaurHeal(activePokemon, activePokemon.currentHp, activePokemon.stats.hp);
      if (vHeal.triggered) updatePokemonHp(0, vHeal.newHp);

      setLogs(prev => [`Win! +${boosted.finalAmount} chips.`, ...prev.slice(0, 3)]);
    } else {
      playSound('lose');
      let baseLost = allIn ? 100 : 10;
      let damage = allIn ? 30 : 10;
      const protected_ = applyLossProtection(activePokemon, baseLost, damage, allIn, activePokemon.currentHp);
      removeChips(protected_.finalChipsLost);
      updatePokemonHp(0, activePokemon.currentHp - protected_.finalHpLost);
      setLogs(prev => [`Lost! -${protected_.finalChipsLost} chips.`, ...prev.slice(0, 3)]);
    }
    setEncounter(null); setIsWalking(true);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between text-xs text-slate-400"><span>ROUTE 1</span><span>{distance}m</span></div>
      <div className="h-48 bg-slate-800 border-2 border-slate-600 rounded flex items-center justify-center relative">
        {encounter ? (
          <div className="text-center animate-bounce">
            <img src={encounter.sprite} className="w-32" />
            <p className="capitalize font-bold">{encounter.name}</p>
          </div>
        ) : <img src={activePokemon?.sprite} className="w-24 animate-pulse" />}
      </div>
      {encounter && (
        <div className="flex gap-2">
          <button onClick={() => handleFight(false)} className="flex-1 bg-blue-600 py-3 rounded font-bold">SAFE BET</button>
          <button onClick={() => handleFight(true)} className="flex-1 bg-red-600 py-3 rounded font-bold border-2 border-yellow-400">ALL-IN!</button>
        </div>
      )}
      <div className="bg-slate-900 p-2 rounded text-[10px] h-24 overflow-hidden">
        {logs.map((l, i) => <p key={i} className="mb-1 border-l-2 border-slate-700 pl-2">{l}</p>)}
      </div>
      <button onClick={onEnterGym} className="w-full bg-slate-700 py-3 rounded font-bold border-2 border-slate-600">CHALLENGE GYM</button>
    </div>
  );
};
export default AdventureView;
