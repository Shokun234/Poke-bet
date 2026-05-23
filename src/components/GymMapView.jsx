import React, { useState } from 'react';
import ShopNode from './nodes/ShopNode';
import SlotNode from './nodes/SlotNode';
import CatchNode from './nodes/CatchNode';
import BossNode from './nodes/BossNode';
import { GYMS } from '../constants/pokemonData';
import { playSound } from '../utils/audio';

const GymMapView = ({ gameState, addChips, removeChips, addToTeam, updatePokemonHp, onExit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeNode, setActiveNode] = useState(null);

  // Create a 3-tier branching map
  const [mapStructure] = useState(() => {
    return [
      [{ type: 'shop' }, { type: 'slot' }],
      [{ type: 'catch' }, { type: 'slot' }],
      [{ type: 'shop' }, { type: 'catch' }],
      [{ type: 'boss' }]
    ];
  });

  const activePokemon = gameState.team[0];
  const currentGym = GYMS[gameState.badges.length] || GYMS[0];

  const handleLeave = () => {
    setActiveNode(null);
    setCurrentStep(s => s + 1);
    if (currentStep >= mapStructure.length - 1) onExit();
  };

  if (activeNode) {
    const props = { onLeave: handleLeave };
    switch (activeNode.type) {
      case 'shop': return <ShopNode chips={gameState.chips} onBuy={i => { playSound('win'); addChips(-i.cost); }} onLeave={handleLeave} />;
      case 'slot': return <SlotNode onWin={amt => { playSound('win'); addChips(amt); }} onLose={amt => { playSound('lose'); removeChips(amt); }} onLeave={handleLeave} />;
      case 'catch': return <CatchNode activePokemon={activePokemon} onCatch={p => { playSound('win'); addToTeam(p); }} onLeave={handleLeave} />;
      case 'boss': return <BossNode gym={currentGym} activePokemon={activePokemon} onWin={() => { playSound('win'); addChips(1000); onExit(); }} onLose={() => { playSound('lose'); onExit(); }} />;
    }
  }

  return (
    <div className="p-4 bg-slate-800 border-2 border-slate-700 rounded shadow-inner">
      <h2 className="text-xl text-yellow-400 mb-8 text-center uppercase tracking-widest">{currentGym.name}</h2>
      <div className="space-y-6">
        {mapStructure.map((tier, i) => (
          <div key={i} className="flex justify-center gap-4">
            {tier.map((node, j) => (
              <button
                key={j}
                disabled={i !== currentStep}
                onClick={() => setActiveNode(node)}
                className={`w-20 h-20 rounded-lg border-4 flex items-center justify-center text-2xl transition-all ${
                  i < currentStep ? 'bg-slate-700 border-slate-600 opacity-50' :
                  i === currentStep ? 'bg-slate-700 border-yellow-400 animate-pulse shadow-lg shadow-yellow-400/20' :
                  'bg-slate-900 border-slate-800'
                }`}
              >
                {node.type === 'shop' && '🛒'}
                {node.type === 'slot' && '🎰'}
                {node.type === 'catch' && '🐾'}
                {node.type === 'boss' && '👑'}
              </button>
            ))}
          </div>
        ))}
      </div>
      <button onClick={onExit} className="w-full mt-8 bg-red-900/50 py-3 rounded text-[10px] text-red-400 border border-red-900">ABANDON CHALLENGE</button>
    </div>
  );
};
export default GymMapView;
