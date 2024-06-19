import React from 'react';
import { Link } from 'react-router-dom';
import pokemon from '../assets/pok.jpg';

const Home = () => {
  return (
     <div
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${pokemon})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50">
        <h1 className="text-white text-center text-4xl pt-10">Welcome to the Pokemon Game</h1>
        <nav className="mt-10">
          <ul className="flex justify-center space-x-10">
            <li><Link className="text-white text-xl" to="/pokemon">Pokemon List</Link></li>
            <li><Link className="text-white text-xl" to="/pokemon/fight">Pokemon Fight</Link></li>
            <li><Link className="text-white text-xl" to="/pokemon/fight/leaderboard">Leaderboard</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Home;