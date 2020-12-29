type PokemonAPI = {
  id: number;
  name: string;
  sprites: {
    // eslint-disable-next-line camelcase
    front_default: string;
  };
};

export default PokemonAPI;
