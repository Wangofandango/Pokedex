import './PokemonSpotlight.css'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { startWithUpperCase } from '../Utils'

export default function PokemonSpotlight({ specificPokemonId }) {

    const [specificPokemon, setSpecificPokemon] = useState(null);

    useEffect(() => {

        let cancel


        const specificPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${specificPokemonId}`;

        axios.get(specificPokemonUrl, {
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(response => ({
            name: response.data.name,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types,
            id: response.data.id,
            sprites: response.data.sprites,
            abilities: response.data.abilities,
            stats: response.data.stats
        })).then(pokemonData => {
            setSpecificPokemon(pokemonData);
        });

        return () => {
            if (cancel) {
                cancel()
            }
        }


    }, [specificPokemonId]);



    if (specificPokemon === null) {
        return <div className="spotlight" id="placeholder">Choose a pokemon</div>
    }

    return <div className="spotlight">
        <h1>{startWithUpperCase(specificPokemon.name)}</h1>
        <h2>#{specificPokemon.id}</h2>
        <img src={specificPokemon.sprites.front_default} alt="Billede af pokemon"></img>
        <h3>Weight: {specificPokemon.weight}</h3>
        <h3>Height: {specificPokemon.height}</h3>
        <h3>Types: <br />
            <div id='typeContainer'>
                {specificPokemon.types.map(t => <div className='type' id={t.type.name}>{t.type.name} </div>)}


            </div>
        </h3>
        <h3>Abilities: <div id='abilityContainer'>
            {specificPokemon.abilities.map(a => a.ability.name).join(", ")}
        </div>
        </h3>

        <h3>Stats: total: {specificPokemon.stats.reduce((acc, s) => acc + s.base_stat, 0)}

            {specificPokemon.stats.map(s =>
                <div className='statContainer'>
                    <h4>{s.stat.name} : {s.base_stat}</h4>
                    <div className='ability' >
                        <div className='statBar' style={{ width: `${(s.base_stat / 255) * 100}%` }}></div>
                    </div>
                </div>

            )}

        </h3>

    </div>
}
