type PokemonInPokedex = {
  name: string;
  url: string;
};

type Pokedex = {
  id: number;
  // eslint-disable-next-line camelcase
  pokemon_species: PokemonInPokedex[];
};

export default Pokedex;
