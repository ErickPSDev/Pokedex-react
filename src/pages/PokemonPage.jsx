import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../components";
import { PokemonContext } from "../context/PokemonContext";
import { primerMayuscula } from "../helper/helper";

export const PokemonPage = () => {
  const { getPokemonByID } = useContext(PokemonContext);

  const [loading, setloading] = useState(true);
  const [pokemon, setPokemon] = useState({}); // objeto vacio

  //desentructurar ID
  const { id } = useParams(); //use a dynamic route

  const fetchPokemon = async (id) => {
    const data = await getPokemonByID(id);
    setPokemon(data);
    setloading(false);
  };

  useEffect(() => {
    fetchPokemon(id);
  }, []);

  return (
    <main className="container main-pokemon">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="header-main-pokemon">
            <span className="number-pokemon">#{pokemon.id}</span>
            <div className="container-img-pokemon">
              <img
                src={pokemon.sprites.other.dream_world.front_default}
                alt={`Pokemon ${pokemon?.name}`}
              />
            </div>

            <div className="container-info-pokemon">
              <h1>{primerMayuscula(pokemon.name)}</h1>
              <div className="card-types info-pokemon-type">
                {pokemon.types.map((type) => (
                  <span key={type.type.name} className={`${type.type.name}`}>
                    {type.type.name}
                  </span>
                ))}
              </div>

              <div className="info-pokemon">
                <div className="group-info">
                  <p>Altura</p>
                  <span>{pokemon.height}</span>
                </div>
                <div className="group-info">
                  <p>Peso</p>
                  <span>{pokemon.weight}KG</span>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- STATS SECTION --> */}
          <div className="container-stats">
            <h1>Estadísticas</h1>
            <div className="stats">
              <div className="stat-group">
                <span>Hp</span>
                <div className="progress-bar"></div>
                <span className="counter-stat">
                  {pokemon.stats[0].base_stat}
                </span>
              </div>

              <div className="stat-group">
                <span>Attack</span>
                <div className="progress-bar"></div>
                <span className="counter-stat">
                  {pokemon.stats[1].base_stat}
                </span>
              </div>

              <div className="stat-group">
                <span>Defense</span>
                <div className="progress-bar"></div>
                <span className="counter-stat">
                  {pokemon.stats[2].base_stat}
                </span>
              </div>

              <div className="stat-group">
                <span>Special Attack</span>
                <div className="progress-bar"></div>
                <span className="counter-stat">
                  {pokemon.stats[3].base_stat}
                </span>
              </div>

              <div className="stat-group">
                <span>Special Defense</span>
                <div className="progress-bar"></div>
                <span className="counter-stat">
                  {pokemon.stats[4].base_stat}
                </span>
              </div>

              <div className="stat-group">
                <span>Speed</span>
                <div className="progress-bar"></div>
                <span className="counter-stat">
                  {pokemon.stats[2].base_stat}
                </span>
              </div>

            </div>
          </div>
        </>
      )}
    </main>
  );
};
