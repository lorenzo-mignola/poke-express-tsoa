import { Controller, Get, Path, Route } from 'tsoa';
import Pokemon from '../interface/Pokemon.interface';
import { PokemonService } from '../service/pokemon.service';

@Route('pokemon')
export class PokemonController extends Controller {
  @Get('{pokemonId}')
  public async getUser(@Path() pokemonId: number): Promise<Pokemon> {
    return new PokemonService().get(pokemonId);
  }
}
