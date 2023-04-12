import React from 'react'
import styles from './PokemonOverview.modules.css'

function getColorsFromType(Types) {
    Types = Types.map(t => t.type.name)

    //If types is more than 1, then make a linear gradiant with the colors
    const colors = {
        "normal": "#A8A77A",
        "fire": "#EE8130",
        "water": "#6390F0",
        "electric": "#F7D02C",
        "grass": "#7AC74C",
        "ice": "#96D9D6",
        "fighting": "#C22E28",
        "poison": "#A33EA1",
        "ground": "#E2BF65",
        "flying": "#A98FF3",
        "psychic": "#F95587",
        "bug": "#A6B91A",
        "rock": "#B6A136",
        "ghost": "#735797",
        "dragon": "#6F35FC",
        "dark": "#705746",
        "steel": "#B7B7CE",
        "fairy": "#D685AD"
    }

    if (Types.length > 1) {
        return `linear-gradient(90deg, ${colors[Types[0]]} 50%, ${colors[Types[1]]} 50%)`
    }

    return colors[Types];
}

function StartWithUpperCase(str) {
    return str[0].toUpperCase() + str.slice(1)
}


export default function PokemonOverview({ pokemon }) {
    return (
        <div>
            {pokemon.map(p => (
                <div className="SpecificPokemon" key={p.name} style={{
                    width: "15%",
                    height: "20%",
                    //Make the divs be able to be in the same row
                    display: "inline-block",
                    //Make the divs have a margin
                    margin: "10px",
                    //Make the divs have a border
                    border: "1px solid black",
                    //Make the divs have a border radius
                    borderRadius: "10px",

                    background: getColorsFromType(p.types)


                }} >


                    <h1>{StartWithUpperCase(p.name)}</h1>
                    <h2>#{p.order} </h2>

                    {/*Make the image appear in the bottom right corner of the div */}

                    <img src={p.sprites.front_default} alt="Billede af pokemon"></img>

                </div>
            ))
            }

        </div >
    )
}
