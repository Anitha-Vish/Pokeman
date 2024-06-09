import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PokemonList = ({pokemons ,setPokemons}) => {
 

  return (
    <div>
      <h1>Pokemon List</h1>
      <ul>
        {pokemons.map(pokemon => (
          <li key={pokemon.id}>
            <Link to={`/pokemon/${pokemon.id}`}>{pokemon.name.english}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
