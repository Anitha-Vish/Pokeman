// src/components/Leaderboard.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Leaderboard = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3015/game/leaderboard"
        );
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard data", error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold underline mb-6'>Leaderboard</h1>
      
      <div className='grid grid-cols-1 gap-6'>
        {games.map((game, index) => (
          <div
            key={game._id}
            className='bg-yellow-200 text-black rounded-lg shadow p-4'>
            <h2 className='text-xl font-bold mb-2'>Game {index + 1}</h2>
            <p>
              <strong>{game.pokemon1}</strong> vs{" "}
              <strong>{game.pokemon2}</strong>
            </p>
            <p>
              Winner: <strong>{game.winner}</strong>
            </p>
            <p>Rounds: {game.rounds}</p>
            <p>Date: {new Date(game.date).toLocaleString()}</p>
          </div>
          
        ))}
        
      </div>
     <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">Back</Link>
    </div>
       
  );
};

export default Leaderboard;
