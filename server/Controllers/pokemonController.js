
const pokedex = require('../pokedex.json');

const getAllPokemon = (req, res) => {
  res.json(pokedex);
};

const getPokemonById = (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokedex.find(p => p.id === id);
  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).send('Pokemon not found');
  }
};



const getPokemonInfo = (req, res) => {
  const id = parseInt(req.params.id);
  const info = req.params.info.toLowerCase();
  const pokemon = pokedex.find(p => p.id === id);
  if (pokemon) {
    const result = pokemon[info];
    if (result) {
      res.json({ [info]: result });
    } else {
      res.status(404).send('Information not found');
    }
  } else {
    res.status(404).send('Pokemon not found');
  }
};

module.exports = {
  getAllPokemon,
  getPokemonById,
  getPokemonInfo,
};