import React from 'react';
const ShopNode = ({ chips, onBuy, onLeave }) => {
  const items = [
    { id: 'dice', name: 'Loaded Dice', cost: 50, description: 'Min roll 3 for 3 turns' },
    { id: 'potion', name: 'Max Potion', cost: 30, description: 'Heal active Pokemon' },
  ];
  return (
    <div className="p-4 bg-slate-700 border-2 border-yellow-500 rounded">
      <h2 className="text-xl text-yellow-400 mb-4">POKÉMART</h2>
      <div className="grid gap-4 mb-4">
        {items.map(item => (
          <div key={item.id} className="p-2 border border-slate-500 rounded flex justify-between items-center">
            <div><p className="font-bold">{item.name}</p><p className="text-xs text-slate-300">{item.description}</p><p className="text-yellow-500">{item.cost} Chips</p></div>
            <button onClick={() => onBuy(item)} disabled={chips < item.cost} className="bg-blue-600 px-3 py-1 rounded disabled:opacity-50 text-xs">BUY</button>
          </div>
        ))}
      </div>
      <button onClick={onLeave} className="w-full bg-red-600 py-2 rounded text-sm">LEAVE</button>
    </div>
  );
};
export default ShopNode;
