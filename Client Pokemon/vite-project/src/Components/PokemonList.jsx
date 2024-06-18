import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../path/animate.css"; // Make sure to use the correct path to your CSS file

const PokemonFight = ({ pokemons }) => {
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [message, setMessage] = useState("");
  const [damage1, setDamage1] = useState(null);
  const [damage2, setDamage2] = useState(null);
  const [round, setRound] = useState(0);
  const [battleFinished, setBattleFinished] = useState(false);
  const [pokemon1Anim, setPokemon1Anim] = useState("");
  const [pokemon2Anim, setPokemon2Anim] = useState("");

  const selectRandomPokemons = () => {
    const randomIndex1 = Math.floor(Math.random() * pokemons.length);
    let randomIndex2 = Math.floor(Math.random() * pokemons.length);

    while (randomIndex2 === randomIndex1) {
      randomIndex2 = Math.floor(Math.random() * pokemons.length);
    }

    setPokemon1({
      ...pokemons[randomIndex1],
      currentHP: pokemons[randomIndex1].base.HP,
    });
    setPokemon2({
      ...pokemons[randomIndex2],
      currentHP: pokemons[randomIndex2].base.HP,
    });
    setMessage("");
    setDamage1(null);
    setDamage2(null);
    setRound(1);
    setBattleFinished(false);
    setPokemon1Anim("");
    setPokemon2Anim("");
  };

  const battleRound = () => {
    if (!pokemon1 || !pokemon2 || battleFinished) {
      setMessage("Please select two Pokémon first.");
      return;
    }

    const damageToPoke2 = Math.max(
      0,
      pokemon1.base.Attack - pokemon2.base.Defense
    );
    const damageToPoke1 = Math.max(
      0,
      pokemon2.base.Attack - pokemon1.base.Defense
    );

    const updatedHP1 = Math.max(0, pokemon1.currentHP - damageToPoke1);
    const updatedHP2 = Math.max(0, pokemon2.currentHP - damageToPoke2);

    setDamage1(damageToPoke2);
    setDamage2(damageToPoke1);

    setPokemon1({ ...pokemon1, currentHP: updatedHP1 });
    setPokemon2({ ...pokemon2, currentHP: updatedHP2 });

    setPokemon1Anim("shake");
    setPokemon2Anim("bounce");

    setTimeout(() => {
      setPokemon1Anim("");
      setPokemon2Anim("");
    }, 500);

    if (updatedHP1 <= 0 && updatedHP2 <= 0) {
      setMessage("It's a tie!");
      setBattleFinished(true);
    } else if (updatedHP1 <= 0) {
      setMessage(`${pokemon2.name.english} wins the battle!`);
      setBattleFinished(true);
    } else if (updatedHP2 <= 0) {
      setMessage(`${pokemon1.name.english} wins the battle!`);
      setBattleFinished(true);
    } else {
      setMessage(
        `Round ${round}: Both Pokémon are still fighting. Continue the battle!`
      );
      setRound(round + 1);
    }
  };

  useEffect(() => {
    if (round > 1 && !battleFinished) {
      const timer = setTimeout(() => {
        battleRound();
      }, 1000);
      return () => clearTimeout(timer);
    }
    if (battleFinished) {
      const gameResult = {
        pokemon1: pokemon1.name.english,
        pokemon2: pokemon2.name.english,
        winner: message.includes("wins") ? message.split(" ")[0] : "Tie",
        rounds: round,
        date: new Date().toISOString(),
      };
      saveGameResult(gameResult);
    }
  }, [round, battleFinished]);

  const saveGameResult = async (gameResult) => {
    try {
      await axios.post("http://localhost:3015/game/save", gameResult);
      console.log("Game result saved:", gameResult);
    } catch (error) {
      console.error("Error saving game result", error);
    }
  };

  return (
    <div className='container mx-auto p-4 full-screen-bg bg-green-500'>
      <h1 className='text-3xl font-bold underline mb-6'>Pokémon Fight</h1>
      <div className='flex justify-center mb-4'>
        <button
          className='bg-blue-500 text-white font-bold py-2 px-4 rounded mr-4'
          onClick={selectRandomPokemons}>
          Select Random Pokémon
        </button>
        <button
          className='bg-green-700 text-white font-bold py-2 px-4 rounded'
          onClick={battleRound}
          disabled={battleFinished || round === 0}>
          {round === 0 ? "Start Battle" : "Continue Battle"}
        </button>
      </div>
      {message && <p className='text-xl mb-4'>{message}</p>}
      {damage1 !== null && damage2 !== null && (
        <div className='mb-4'>
          <p className='text-lg'>
            Damage to {pokemon2.name.english}: {damage1}
          </p>
          <p className='text-lg'>
            Damage to {pokemon1.name.english}: {damage2}
          </p>
        </div>
      )}
      <div className='grid grid-cols-2 gap-6'>
        {pokemon1 && (
          <div
            className={`bg-green-500 text-white rounded-lg shadow p-4 flex flex-col items-center ${pokemon1Anim}`}>
            <img
              src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${String(
                pokemon1.id
              ).padStart(3, "0")}.png`}
              alt={pokemon1.name.english}
              className='w-32 h-32 mb-4'
            />
            <h2 className='text-xl font-bold mb-2'>{pokemon1.name.english}</h2>
            <p>
              HP: {pokemon1.currentHP}/{pokemon1.base.HP}
            </p>
          </div>
        )}
        {pokemon2 && (
          <div
            className={`bg-green-500 text-white rounded-lg shadow p-4 flex flex-col items-center ${pokemon2Anim}`}>
            <img
              src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${String(
                pokemon2.id
              ).padStart(3, "0")}.png`}
              alt={pokemon2.name.english}
              className='w-32 h-32 mb-4'
            />
            <h2 className='text-xl font-bold mb-2'>{pokemon2.name.english}</h2>
            <p>
              HP: {pokemon2.currentHP}/{pokemon2.base.HP}
            </p>
          </div>
        )}
      </div>
      <Link to="/" className="text-black-500 hover:underline mt-4 inline-block">Back</Link>
    </div>
  );
};

export default PokemonFight;
