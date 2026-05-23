import { describe, it, expect } from 'vitest';
import { calculatePower, resolveClash } from '../clashRoll';

describe('clashRoll logic', () => {
  it('calculates power correctly', () => {
    expect(calculatePower(10, 5)).toBe(50);
  });

  it('resolves clash correctly', () => {
    const result = resolveClash(10, 5, 20, 2);
    expect(result.playerPower).toBe(50);
    expect(result.enemyPower).toBe(40);
    expect(result.playerWon).toBe(true);
  });
});
