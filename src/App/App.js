import React, { useState, useEffect } from 'react';
import PokemonOverview from '../PokemonOverview/PokemonOverview';
import axios from 'axios';
import Pagination from '../Pagination/Pagination';
import { Link, Outlet } from 'react-router-dom';


function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()

  const [loading, setLoading] = useState(true)

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
            order: response.data.order,
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


      <PokemonOverview pokemon={pokemon} />
      <Pagination
        goToNextPage={nextPageUrl ? goToNextPage : null}
        goToPrevPage={prevPageUrl ? goToPrevPage : null}
      />
    </>
  );
}


export default App;
