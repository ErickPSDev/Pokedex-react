import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { CardPokemon } from '../components'
import { PokemonContext } from '../context/PokemonContext'


export const SearchPage = () => {
  // Terminos de busqueda
  const location = useLocation();
  //console.log(location)
  // destructure globalpokemons
  const { globalPokemons } = useContext(PokemonContext);
  // filtrar name
  const filteredPokemons = globalPokemons.filter(pokemon =>
      pokemon.name.includes(location.state.toLowerCase())
    );
  //console.log(filteredPokemons)

  return (
    <div className="container">
      <p className="p-search">
        Se encontraron <span>{filteredPokemons.length}</span>{' '}
        resultados:
      </p>
      <div className="card-list-pokemon container">
        {filteredPokemons.map(pokemon => (
          <CardPokemon pokemon={pokemon} key={pokemon.id} />
        ))}
      </div>
    </div>
  );
};
