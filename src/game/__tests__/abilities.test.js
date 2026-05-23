import { describe, it, expect, vi } from 'vitest';
import { applyDiceManipulators, applyPayoutBoosters, applyLossProtection, applyVenusaurHeal } from '../abilities';

describe('abilities logic', () => {
  it('Pikachu Static Roll works', () => {
    const result = applyDiceManipulators({ id: 25 }, 1, 5);
    expect(result.finalRoll).toBe(2);
    expect(result.effectsTriggered).toContain('Static Roll');
  });

  it('Mewtwo Psychic Override works', () => {
    const result = applyDiceManipulators({ id: 150 }, 4, 6);
    expect(result.finalEnemyRoll).toBe(4);
    expect(result.effectsTriggered).toContain('Psychic Override');
  });

  it('Abra Teleport Bet works', () => {
    const result = applyDiceManipulators({ id: 63 }, 3, 6);
    expect(result.effectsTriggered).toContain('Teleport Bet');
  });

  it('Meowth Pay Day Jackpot works', () => {
    const result = applyPayoutBoosters({ id: 52 }, 100, true, false);
    expect(result.finalAmount).toBe(200);
    expect(result.effectsTriggered).toContain('Pay Day Jackpot');
  });

  it('Snorlax Heavy Insurance works', () => {
    const result = applyLossProtection({ id: 143 }, 100, 20, true, 100);
    expect(result.finalChipsLost).toBe(0);
    expect(result.finalHpLost).toBe(10);
    expect(result.effectsTriggered).toContain('Heavy Insurance');
  });

  it('Golem Sturdy Shield works', () => {
    const result = applyLossProtection({ id: 76 }, 10, 50, false, 40);
    expect(result.finalHpLost).toBe(39);
    expect(result.effectsTriggered).toContain('Sturdy Shield');
  });

  it('Venusaur Leech Seed works', () => {
    const result = applyVenusaurHeal({ id: 3 }, 10, 100);
    expect(result.newHp).toBe(15);
    expect(result.triggered).toBe(true);
  });
});
