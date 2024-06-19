// models/Game.js
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  pokemon1: { type: String, required: true },
  pokemon2: { type: String, required: true },
  winner: { type: String, required: true },
  rounds: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const Game= mongoose.model('Game', gameSchema);
module.exports = Game;
