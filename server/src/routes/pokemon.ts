import axios from 'axios';
import express from 'express';
import { param, validationResult } from 'express-validator';
import Pokemon from '../interface/PokemonInterface';
import PokemonAPI from '../interface/PokemonType';

interface RequestGetByID extends express.Request {
  params: {
    id: string;
  };
}

const router = express.Router();
/* ------------ GET ------------ */
router.get(
  '/:id',
  param('id', 'Pokemon ID missing or not a valid ID').isNumeric(),
  async (req: RequestGetByID, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const reqId = +req.params.id;
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
      return res.json(cleanPokemon);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
);

export default router;
