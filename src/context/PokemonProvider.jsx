import { useEffect, useState } from "react";
import { useForm } from "../hook/useForm";
import { PokemonContext } from "./PokemonContext";

export const PokemonProvider = ({ children }) => {
  //UseState
  const [allPokemons, setAllPokemons] = useState([]);
  const [globalPokemons, setGlobalPokemons] = useState([]);
  const [offset, setOffSet] = useState(0);

  //CustomHook - useForm
  const { valueSearch, onInputChange, onResetForm } = useForm({
    valueSearch: "",
  });

  // Simple States for the application
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);

  // Call first 50 pokemons from the API
  const getAllPokemons = async (limit = 50) => {
    const baseURL = "https://pokeapi.co/api/v2/";

    const res = await fetch(
      `${baseURL}pokemon?limit=${limit}&offset=${offset}`
    );

    const data = await res.json();
    //console.log(data);
    // promesa para obtener mas informacion de los pokemones, esto nos da un arreglo de promesas.
    const promises = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      return data;
    });
    const results = await Promise.all(promises);
    // imprime array de promesas
    //console.log(promises)
    // Imprime lo que retorna la promesa
    //console.log(results)
    setAllPokemons([...allPokemons, ...results]);
    setLoading(false);
  };

  // Get all pokemons, para las busquedas en todo el directorio, no en solo 50 elementos previamente definidos
  const getGlobalPokemons = async () => {
    const baseURL = "https://pokeapi.co/api/v2/";

    const res = await fetch(`${baseURL}pokemon?limit=100000&offset=0`);
    const data = await res.json();

    const promises = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      return data;
    });
    const results = await Promise.all(promises);

    setGlobalPokemons(results);
    setLoading(false);
  };

  //Get pokemons by ID
  const getPokemonByID = async (id) => {
    const baseURL = "https://pokeapi.co/api/v2/";

    const res = await fetch(`${baseURL}pokemon/${id}`);
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    getGlobalPokemons();
  }, [offset]); // cada vez que offset cambie va a volver a hacer la llamada al API

  useEffect(() => {
    getAllPokemons();
  }, []);

  // button load more
  const onClickLoadMore = () => {
    setOffSet(offset + 50)
  }

  // filter function + state
  const [typeSelected, setTypeSelected] = useState({
    grass: false,
    normal: false,
    fighting: false,
    flying: false,
    poison: false,
    ground: false,
    rock: false,
    bug: false,
    ghost: false,
    steel: false,
    fire: false,
    water: false,
    electric: false,
    psychic: false,
    ice: false,
    dragon: false,
    dark: false,
    fairy: false,
    unknow: false,
    shadow: false,
  });

  const [filteredPokemons, setFilteredPokemons] = useState([]);

  const handleCheckbox = (e) => {
    setTypeSelected({
      ...typeSelected,
      [e.target.name]: e.target.checked,
    });

    if (e.target.checked) {
      const filteredResults = globalPokemons.filter((pokemon) =>
        pokemon.types.map((type) => type.type.name).includes(e.target.name)
      );
      //console.log(filteredResults);
      setFilteredPokemons([
        ...filteredPokemons,
        ...filteredResults
      ])
    } else { // para cuando modificamos el checkbox
      const filteredResults = filteredPokemons.filter((pokemon) =>
      !pokemon.types
      .map((type) => type.type.name)
      .includes(e.target.name)
    );
    //console.log(filteredResults);
    setFilteredPokemons([...filteredResults])
    }

  };

  return (
    <PokemonContext.Provider
      value={{
        valueSearch,
        onInputChange,
        onResetForm,
        allPokemons,
        globalPokemons,
        getPokemonByID,
        onClickLoadMore,
        //componente loader
        loading,
        setLoading,
        // btn filter
        active,
        setActive,
        // filter container checkbox
        handleCheckbox,
        filteredPokemons,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
