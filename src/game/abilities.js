import { ROLL_DICE } from './clashRoll';

export const applyDiceManipulators = (pokemon, originalRoll, enemyRoll) => {
  let finalRoll = originalRoll;
  let finalEnemyRoll = enemyRoll;
  let effectsTriggered = [];

  // Pikachu: Static Roll
  if (pokemon.id === 25 && finalRoll < 2) { finalRoll = 2; effectsTriggered.push('Static Roll'); }

  // Mewtwo: Psychic Override
  if (pokemon.id === 150) { finalEnemyRoll = Math.max(1, finalEnemyRoll - 2); effectsTriggered.push('Psychic Override'); }

  // Abra: Teleport Bet (Simulated by rerolling enemy if high)
  if (pokemon.id === 63 && enemyRoll >= 5) { finalEnemyRoll = ROLL_DICE(); effectsTriggered.push('Teleport Bet'); }

  return { finalRoll, finalEnemyRoll, effectsTriggered };
};

export const applyPayoutBoosters = (pokemon, amount, isDoubleRoll, isSlotWin) => {
  let finalAmount = amount;
  let effectsTriggered = [];

  // Meowth: Pay Day
  if (pokemon.id === 52 && isDoubleRoll) { finalAmount *= 2; effectsTriggered.push('Pay Day Jackpot'); }

  // Persian: Double Down
  if (pokemon.id === 53 && isSlotWin) { finalAmount = Math.floor(finalAmount * 1.15); effectsTriggered.push('Double Down'); }

  return { finalAmount, finalAmount, effectsTriggered };
};

export const applyLossProtection = (pokemon, chipsLost, hpLost, isAllIn, currentHp) => {
  let finalChipsLost = chipsLost;
  let finalHpLost = hpLost;
  let effectsTriggered = [];

  // Snorlax: Heavy Insurance
  if (pokemon.id === 143 && isAllIn) { finalChipsLost = 0; finalHpLost = Math.floor(hpLost / 2); effectsTriggered.push('Heavy Insurance'); }

  // Golem: Sturdy Shield
  if (pokemon.id === 76 && currentHp - finalHpLost <= 0) {
    finalHpLost = currentHp - 1;
    effectsTriggered.push('Sturdy Shield');
  }

  return { finalChipsLost, finalHpLost, effectsTriggered };
};

export const applyVenusaurHeal = (pokemon, currentHp, maxHp) => {
  if (pokemon.id === 3) {
    const heal = Math.floor(maxHp * 0.05);
    return { newHp: Math.min(maxHp, currentHp + heal), triggered: true };
  }
  return { newHp: currentHp, triggered: false };
};
