const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const connectionToDB = require("./DB/dbConnection.js");
const sanitize = require("express-mongo-sanitize");
const Game = require("./models/pokomonModel");
require("dotenv").config();

// Import the cors middleware
const cors = require("cors");
const axios = require("axios");

const pokemonRouter = require("./routes/pokemon");
// const gameRouter = require('./routes/pokemon');

// const gameRouter = require('./routes/game');
const app = express();
const PORT = process.env.PORT;

// Connect to MongoDB

connectionToDB();

app.use(sanitize({ replaceWith: "_", allowDots: true }));
app.use(express.json());

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());

// Use the pokemonRouter for routes starting with /pokemon
app.use("/pokemon", pokemonRouter);
// app.use('/game', gameRouter);

// app.get('/download-pokedex', async (req, res) => {
//   const url = 'https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json'; // replace with the actual URL

//   try {
//     const response = await axios.get(url);
//     const json = response.data;

//     const filePath = path.join(__dirname, 'pokedex.json');
//     fs.writeFileSync(filePath, JSON.stringify(json, null, 2));

//     res.download(filePath, 'pokedex.json', (err) => {
//       if (err) {
//         console.error('Error sending file:', err);
//         res.status(500).send('Error sending file');
//       }
//     });
//   } catch (error) {
//     console.error('There has been a problem with your fetch operation:', error);
//     res.status(500).send('Error fetching JSON');
//   }
// });

// // Route to fetch Pokemon data from the provided URL
// app.get('/pokemon', async (req, res) => {
//   try {
//     const response = await axios.get('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json');
//     const pokemonData = response.data;
//     res.json(pokemonData);
//   } catch (error) {
//     res.status(500).send('Error fetching Pokemon data');
//   }
// });

// // Route to get a specific Pokemon by ID
// app.get('/pokemon/:id', async (req, res) => {
//   try {
//     const pokemonId = parseInt(req.params.id);
//     const response = await axios.get('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json');
//     const pokemonData = response.data;
//     const pokemon = pokemonData.find(pokemon => pokemon.id === pokemonId);
//     if (pokemon) {
//       res.json(pokemon);
//     } else {
//       res.status(404).send('Pokemon not found');
//     }
//   } catch (error) {
//     res.status(500).send('Error fetching Pokemon data');
//   }
// });

// // Route to get a specific information of a Pokemon by ID
// app.get('/pokemon/:id/:info', async (req, res) => {
//   try {
//     const pokemonId = parseInt(req.params.id);
//     const info = req.params.info.toLowerCase();
//     const response = await axios.get('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json');
//     const pokemonData = response.data;
//     const pokemon = pokemonData.find(pokemon => pokemon.id === pokemonId);
//     if (pokemon) {
//       const pokemonInfo = pokemon[info];
//       if (pokemonInfo) {
//         res.json({ [info]: pokemonInfo });
//       } else {
//         res.status(404).send('Information not found');
//       }
//     } else {
//       res.status(404).send('Pokemon not found');
//     }
//   } catch (error) {
//     res.status(500).send('Error fetching Pokemon data');
//   }
// });

//Saving results in backend
app.post("/game/save", async (req, res) => {
  // Request body destructuring
  const { pokemon1, pokemon2, winner, rounds, date } = req.body;

  // Check if all required fields are provided
  if (!pokemon1 || !pokemon2 || !winner || rounds === undefined) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newGame = new Game({
      pokemon1,
      pokemon2,
      winner,
      rounds,
      date,
      // You can add more fields as needed
    });

    await newGame.save();
    res.status(201).json({ message: "Game data saved successfully" });
  } catch (error) {
    console.error("Error saving game data:", error);
    res.status(500).json({ error: "Failed to save game data" });
  }
});

// Retrieve leaderboard
app.get("/game/leaderboard", async (req, res) => {
  try {
    const games = await Game.find().sort({ date: -1 }).limit(10);
    console.log("Retrieved games:", games); // Log retrieved games
    res.status(200).json(games);
  } catch (error) {
    console.error("Error retrieving leaderboard:", error); // Log error
    res.status(500).json({ error: "Failed to retrieve leaderboard" });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the PokeFight API");
});

//Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
