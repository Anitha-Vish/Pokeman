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
     <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold mb-6">{pokemon.name.english}</h1>
        <img
          src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${String(pokemon.id).padStart(3, "0")}.png`}
          alt={pokemon.name.english}
          className="w-32 h-32 mb-4 mx-auto"
        />
        <p className="text-xl mb-2">Type: {pokemon.type.join(", ")}</p>
        <p className="text-xl mb-2">Base Stats:</p>
        <ul className="list-disc list-inside text-left mx-auto w-max">
          {Object.entries(pokemon.base).map(([key, value]) => (
            <li key={key}>
              {key}: {value}
            </li>
          ))}
        </ul>
        <Link to="/pokemon" className="text-blue-500 hover:underline mt-4 inline-block">Back to List</Link>
      </div>
    </div>
  );
};

export default PokemonDetail;
