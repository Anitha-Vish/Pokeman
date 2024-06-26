import { Link } from 'react-router-dom';

const PokemonList = ({ pokemons }) => {
  const sortedPokemons = [...pokemons].sort((a, b) => a.name.english.localeCompare(b.name.english));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold underline mb-6">Pokemon List</h1>
      <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">Back</Link>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedPokemons.map((pokemon) => (
          <li
            key={pokemon.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
          >
            <img
              src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${String(
                pokemon.id
              ).padStart(3, "0")}.png`}
              alt={pokemon.name.english}
              className="w-32 h-32 mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{pokemon.name.english}</h2>
            <Link to={`/pokemon/${pokemon.id}`} className="text-blue-500 hover:underline">
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
