import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import "./App.css";
import './index.css';
import PokemonList from './Components/PokemonList';
import PokemonDetail from './Components/PokemonDetail';
import PokemonInfo from './Components/PokemonInfo';


// import {PokemonList }from './Components/AllPokemon';
// import {PokemonDetail }from './Components/PokemonDetailId';
// import {PokemonInfo } from './Components/PokemonInfo';




function App() {

   const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/pokemon')
      .then(response => setPokemons(response.data))
      .catch(error => console.error(error));
  }, []);

console.log(pokemons);

  return (
  

        <Routes>
          <Route path="/pokemon" element={<PokemonList pokemons={pokemons} setPokemons={setPokemons}/>} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
          <Route path="/pokemon/:id/:info" element={<PokemonInfo />} /> 
        </Routes>
    
 
  );
}

export default App;