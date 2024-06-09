const express = require('express');
const router = express.Router();
const pokemonController = require('../Controllers/pokemonController');

router.get('/', pokemonController.getAllPokemon);
router.get('/:id', pokemonController.getPokemonById);
router.get('/:id/:info', pokemonController.getPokemonInfo);

module.exports = router;