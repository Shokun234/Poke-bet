import React, { useState, useEffect } from 'react';
import { useGameState } from './hooks/useGameState';
import AdventureView from './components/AdventureView';
import GymMapView from './components/GymMapView';
import { fetchPokemonData } from './utils/pokeApi';

function App() {
  const { gameState, addChips, removeChips, addToTeam, updatePokemonHp } = useGameState();
  const [view, setView] = useState('adventure');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initTeam = async () => {
      try {
        if (gameState.team.length === 0) {
          const bulbasaur = await fetchPokemonData(1);
          if (bulbasaur) {
            addToTeam(bulbasaur);
          }
        }
      } catch (error) {
        console.error("Failed to initialize team:", error);
      } finally {
        setLoading(false);
      }
    };
    initTeam();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center font-pixel">
      <p className="text-yellow-400 animate-pulse tracking-tighter">LOADING KANTO ROUTE...</p>
    </div>
  );

  const activePokemon = gameState.team[0];

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-slate-200 font-pixel selection:bg-yellow-400 selection:text-black">
      <div className="max-w-md mx-auto min-h-screen flex flex-col pt-6 pb-24 px-4">
        <header className="text-center space-y-2 mb-8">
          <h1 className="text-3xl text-yellow-400 drop-shadow-[0_4px_0_rgba(0,0,0,0.5)] tracking-tighter">POKÉ-BET</h1>
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-slate-900/80 rounded-full border border-slate-800 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] text-slate-400">CHIPS:</span>
            <span className="text-[10px] text-yellow-500 font-bold">{gameState.chips}</span>
          </div>
        </header>

        <main className="flex-1 bg-slate-900/40 rounded-3xl border-4 border-slate-800/50 overflow-hidden backdrop-blur-xl shadow-2xl relative">
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/5 to-transparent pointer-events-none"></div>
          {view === 'adventure' ? (
            <AdventureView
              gameState={gameState}
              addChips={addChips} removeChips={removeChips}
              addToTeam={addToTeam} updatePokemonHp={updatePokemonHp}
              onEnterGym={() => setView('gym')}
            />
          ) : (
            <GymMapView
              gameState={gameState}
              addChips={addChips} removeChips={removeChips}
              addToTeam={addToTeam} updatePokemonHp={updatePokemonHp}
              onExit={() => setView('adventure')}
            />
          )}
        </main>

        {activePokemon && (
          <footer className="fixed bottom-4 left-4 right-4 max-w-md mx-auto">
            <div className="bg-slate-900/90 backdrop-blur-md border-4 border-slate-800 rounded-2xl p-3 flex items-center gap-4 shadow-2xl">
              <div className="relative">
                <div className="absolute -inset-1 bg-yellow-400/20 blur-sm rounded-full animate-pulse"></div>
                <img src={activePokemon.sprite} className="w-14 h-14 relative pixelated drop-shadow-lg" />
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="flex justify-between items-end">
                  <p className="text-[10px] uppercase font-black text-white">{activePokemon.name}</p>
                  <p className="text-[8px] text-slate-500 font-bold">LV. {activePokemon.level || 5}</p>
                </div>
                <div className="h-2.5 bg-slate-950 rounded-full border border-slate-800 p-0.5 shadow-inner">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(34,197,94,0.4)] ${
                      (activePokemon.currentHp / activePokemon.stats.hp) > 0.5 ? 'bg-green-500' :
                      (activePokemon.currentHp / activePokemon.stats.hp) > 0.2 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(activePokemon.currentHp / activePokemon.stats.hp) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[7px] text-slate-500 font-bold tracking-widest uppercase">
                  <span>HP {activePokemon.currentHp}/{activePokemon.stats.hp}</span>
                  <span>ATK {activePokemon.stats.atk} | DEF {activePokemon.stats.def}</span>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

export default App;
