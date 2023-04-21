import './App.css';
import React, { useState, useEffect } from 'react';
import PokemonOverview from '../PokemonOverview/PokemonOverview';
import axios from 'axios';
import Pagination from '../Pagination/Pagination';
import PokemonSpotlight from '../PokemonSpotlight/PokemonSpotlight';



function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  const [specificPokemonId, setSpecificPokemonId] = useState(null);

  useEffect(() => {
    setLoading(true)

    let cancel

    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(response => {

      setLoading(false)


      setNextPageUrl(response.data.next)

      setPrevPageUrl(response.data.previous)

      Promise.all(
        response.data.results.map(p =>
          axios.get(p.url).then(response => ({
            name: response.data.name,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types,
            id: response.data.id,
            sprites: response.data.sprites
          }))
        )
      ).then(pokemonData => {
        setPokemon(pokemonData);
      });

      return () => {
        if (cancel) {
          cancel()
        }
      }

    })
  }, [currentPageUrl]);

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }




  if (loading) return "Loading..."


  return (
    <>

      <h1>Pokemon</h1>
      <h2>Click on a pokemon to see more details</h2>
      <div class="main">
        <PokemonOverview pokemon={pokemon} setSpecificPokemonId={setSpecificPokemonId} />

        <PokemonSpotlight specificPokemonId={specificPokemonId} />

      </div>

      <Pagination
        goToNextPage={nextPageUrl ? goToNextPage : null}
        goToPrevPage={prevPageUrl ? goToPrevPage : null}
      />
    </>
  );
}


export default App;
