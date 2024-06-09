import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/pokemon/${id}`)
      .then(response => setPokemon(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div>
      <h1>{pokemon.name.english}</h1>
      <p>Type: {pokemon.type.join(', ')}</p>
      <p>Base: {JSON.stringify(pokemon.base)}</p>
      <Link to="/">Back to List</Link>
    </div>
  );
};

export default PokemonDetail;
