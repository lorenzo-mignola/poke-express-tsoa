import axios from 'axios';
import Pokemon from '../interface/Pokemon.interface';
import PokemonAPI from '../interface/Pokemon.type';

export class PokemonService {
  public async get(reqId: number) {
    const apiRes = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${reqId}`
    );
    const pokemonApi: PokemonAPI = apiRes.data;
    const {
      id,
      name,
      // eslint-disable-next-line camelcase
      sprites: { front_default: img },
    } = pokemonApi;
    const cleanPokemon: Pokemon = { id, name, img };
    return cleanPokemon;
  }
}
