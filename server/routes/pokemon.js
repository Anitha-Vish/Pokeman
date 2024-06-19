const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Game = require('../models/pokomonModel');

const app = express();
//  const port = 3002;
const pokemonController = require('../Controllers/pokemonController');
app.use(express.json());


// Save game result
// router.post('/game/save', async (req, res) => {
//   const game = new Game(req.body);

//    // Validate the game data
//   if (!game.winner || !game.rounds || !game.pokemon1 || !game.pokemon2) {
//     return res.status(400).send('Missing game data');
//   }


//   try {
    
//     await game.save();
//     res.status(201).send(game);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });



router.get('/', pokemonController.getAllPokemon);
router.get('/:id', pokemonController.getPokemonById);
router.get('/:id/:info', pokemonController.getPokemonInfo);

// app.listen(PORT, () => {
//   console.log(`Server running on port ${port}`);
// });


module.exports = router;