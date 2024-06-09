
const express = require('express');
const fs = require('fs');
const path = require('path');


// Import the cors middleware
 const cors = require('cors');
const axios = require('axios');

const pokemonRouter = require('./routes/pokemon');
const app = express();
const PORT = process.env.PORT || 3000;


// Enable CORS for all routes
 app.use(cors());

// Use the pokemonRouter for routes starting with /pokemon
app.use('/pokemon', pokemonRouter);

app.get('/download-pokedex', async (req, res) => {
  const url = 'https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json'; // replace with the actual URL

  try {
    const response = await axios.get(url);
    const json = response.data;

    const filePath = path.join(__dirname, 'pokedex.json');
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2));

    res.download(filePath, 'pokedex.json', (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error sending file');
      }
    });
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    res.status(500).send('Error fetching JSON');
  }
});


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



// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the PokeFight API');
});


//Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});