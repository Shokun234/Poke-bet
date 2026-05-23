import React, { useState } from 'react';
const SYMBOLS = ['🍎', '🍋', '🍒', '🔔', '💎', '7️⃣'];
const SlotNode = ({ onWin, onLose, onLeave }) => {
  const [reels, setReels] = useState(['?', '?', '?']);
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState('Feeling lucky?');
  const spin = () => {
    if (spinning) return;
    setSpinning(true); setMessage('Spinning...');
    setTimeout(() => {
      const newReels = [SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)], SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)], SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]];
      setReels(newReels); setSpinning(false);
      if (newReels[0] === newReels[1] && newReels[1] === newReels[2]) { setMessage('JACKPOT!'); onWin(500); }
      else if (newReels[0] === newReels[1] || newReels[1] === newReels[2] || newReels[0] === newReels[2]) { setMessage('Small Win!'); onWin(50); }
      else { setMessage('No luck.'); onLose(10); }
    }, 1000);
  };
  return (
    <div className="p-4 bg-slate-700 border-2 border-purple-500 rounded text-center">
      <h2 className="text-xl text-purple-400 mb-4">SLOTS</h2>
      <div className="flex justify-center gap-4 mb-6">{reels.map((s, i) => (<div key={i} className="w-16 h-20 bg-slate-900 border-4 border-slate-600 rounded flex items-center justify-center text-3xl">{s}</div>))}</div>
      <div className="flex gap-2"><button onClick={spin} disabled={spinning} className="flex-1 bg-purple-600 py-2 rounded text-sm">SPIN</button><button onClick={onLeave} className="flex-1 bg-slate-600 py-2 rounded text-sm">LEAVE</button></div>
    </div>
  );
};
export default SlotNode;
