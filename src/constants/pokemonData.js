export const ABILITIES = {
  DICE_MANIPULATOR: 'DICE_MANIPULATOR',
  PAYOUT_BOOSTER: 'PAYOUT_BOOSTER',
  LOSS_PROTECTION: 'LOSS_PROTECTION',
};

export const KANTO_SPECIAL_POKEMON = {
  25: { id: 25, name: 'Pikachu', abilityType: ABILITIES.DICE_MANIPULATOR, abilityName: 'Static Roll', description: 'Minimum roll of 2' },
  63: { id: 63, name: 'Abra', abilityType: ABILITIES.DICE_MANIPULATOR, abilityName: 'Teleport Bet', description: 'Reroll enemy once' },
  65: { id: 65, name: 'Alakazam', abilityType: ABILITIES.DICE_MANIPULATOR, abilityName: 'Mind Control', description: 'See enemy roll' },
  150: { id: 150, name: 'Mewtwo', abilityType: ABILITIES.DICE_MANIPULATOR, abilityName: 'Psychic Override', description: '-2 to enemy roll' },
  52: { id: 52, name: 'Meowth', abilityType: ABILITIES.PAYOUT_BOOSTER, abilityName: 'Pay Day Jackpot', description: '100% bonus on double rolls' },
  53: { id: 53, name: 'Persian', abilityType: ABILITIES.PAYOUT_BOOSTER, abilityName: 'Double Down', description: '+15% slot bonus' },
  133: { id: 133, name: 'Eevee', abilityType: ABILITIES.PAYOUT_BOOSTER, abilityName: 'Wild Card', description: 'Multi-element slot bonus' },
  143: { id: 143, name: 'Snorlax', abilityType: ABILITIES.LOSS_PROTECTION, abilityName: 'Heavy Insurance', description: 'No chip loss on All-In failure' },
  76: { id: 76, name: 'Golem', abilityType: ABILITIES.LOSS_PROTECTION, abilityName: 'Sturdy Shield', description: 'Survive with 1 HP' },
  3: { id: 3, name: 'Venusaur', abilityType: ABILITIES.LOSS_PROTECTION, abilityName: 'Leech Seed', description: '5% HP regen on win' }
};

export const ROUTES = [
  { id: 1, name: 'Route 1', minLevel: 1, maxLevel: 5 },
  { id: 2, name: 'Route 2', minLevel: 3, maxLevel: 7 },
];

export const GYMS = [
  { id: 1, name: 'Pewter Gym', leader: 'Brock', pokemonId: 95, def: 120 },
  { id: 2, name: 'Cerulean Gym', leader: 'Misty', pokemonId: 121, def: 85 },
];
