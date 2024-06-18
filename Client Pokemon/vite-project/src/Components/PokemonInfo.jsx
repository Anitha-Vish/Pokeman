import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const PokemonInfo = () => {
  const { id, info } = useParams();
  const [pokemonInfo, setPokemonInfo] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3015/pokemon/${id}/${info}`)
      .then(response => setPokemonInfo(response.data))
      .catch(error => console.error(error));
  }, [id, info]);

  if (!pokemonInfo) return <div>Loading...</div>;

  return (
    <div>
      <h1>Pokemon Info</h1>
      <p>{info.charAt(0).toUpperCase() + info.slice(1)}: {JSON.stringify(pokemonInfo[info])}</p>
      <Link to={`/pokemon/${id}`}>Back to Pokemon Detail</Link>
    </div>
  );
};

export default PokemonInfo;
