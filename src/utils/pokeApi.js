const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonData = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${id}`);
    const data = await response.json();

    const stats = {};
    data.stats.forEach(s => {
      stats[s.stat.name] = s.base_stat;
    });

    const isShiny = Math.random() < 0.07;

    const spriteUrl = isShiny
      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`
      : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    return {
      id: data.id,
      name: data.name,
      types: data.types.map(t => t.type.name),
      stats: {
        hp: stats.hp,
        atk: stats.attack,
        def: stats.defense,
        spa: stats['special-attack'],
        spd: stats['special-defense'],
        spe: stats.speed,
      },
      sprite: spriteUrl,
      isShiny
    };
  } catch (error) {
    console.error(`Error fetching pokemon ${id}:`, error);
    return null;
  }
};

export const getRandomKantoId = () => Math.floor(Math.random() * 151) + 1;
