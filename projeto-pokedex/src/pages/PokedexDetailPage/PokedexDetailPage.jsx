import React from "react";
import axios from "axios"
import { useEffect, useState } from "react";
import { useRouterMatch } from "react-router-dom";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon/"
});

const PokedexDetailPage = () => {
  const {pokemon, setPokemon} = useState([]);
  const {pokemonSpecie, setPokemonSpecie} = useState([]);
  const {isLoading, setIsLoading} = useState(true);
  const {imagePokemon, setImagePokemon} = useState("");
  const {params} = useRouterMatch();

  useEffect(() => {
    const fetchData = async () => {
      await api.get(`pokemon/${params.pokemonIndex}`)
        .then(response => {
          const {
            name,
            types,
            sprites,
            id, 
            weight,
            height,
            stats, 
            abilities,
          }
          = response.data;
          setPokemon({
            name: name.replace(/-/g, " "),
            types: types.map( 
              (typeInfo) => typeInfo.type.name[0].toUpperCase() + typeInfo.type.name.slice(1)
            ),
            abilities = abilities.map(
              (abilityInfo) => abilityInfo.ability.name[0].toUpperCase() + abilityInfo.ability.name.slice(1)
            ),
            id: id,
            weight: weight/10,
            height: height/10,
            spriteImageUrl= sprites.front_default,
            stats: stats.map(
              (statInfo) => statInfo.base_stat
            ),
            
          });
          
          evs: stats
          .filter((stat) => {
              if (stat.effort > 0) {
                return true;
              }
              return false;
            })
            .map((stat) => {
              return `${stat.effort} ${stat.stat.name
                .toLowerCase()
                .split("-")
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(" ")}`;
            })
            .join(", "),
          });
        })
              await api
        .get(`pokemon-species/${params.pokemonIndex}`)
        .then((response) => {
          const {
            flavor_text_entries,
            gender_rate,
            capture_rate,
            egg_groups,
            hatch_counter,
          } = response.data;
          setPokemonSpecies({
            description: flavor_text_entries
              .filter((flavor) => flavor.language.name === "en")
              .map((flavor) => flavor.flavor_text),

            genderRatioFemale: gender_rate * 12.5,
            genderRatioMale: 12.5 * (8 - gender_rate),
            catchRate: Math.round((100 / 255) * capture_rate),
            eggGroups: egg_groups
              .map((group) => {
                return group.name
                  .toLowerCase()
                  .split(" ")
                  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(" ");
              })
              .join(", "),
            hatchSteps: 255 * (hatch_counter + 1),
          });
        });

      await setImagePokemon(getPokemonImageUrl2(pokemon.id));

      setIsLoading(false);
    };

    loadPokemonData();
  }, [params.pokemonIndex, pokemon.id]);

  const baseStatsName = [
    "HP",
    "Attack",
    "Defense",
    "Sp. Attack",
    "Sp. Defense",
    "Speed",
  ];

  return isLoading ? (
    <div> 
      <h1>Loading...</h1>
    </div>
  ) : (
    <div>
      <h1>{pokemon.name}</h1>
      <div className="card1">
        <div className="card-image">
          <img src={imagePokemon} alt={pokemon.name} />
        </div>
        <div className="card-content">
          <table>
            <tbody>
              <tr>
                <td>Id</td>
                <td># {pokemon.id}</td>
              </tr>
              <tr>
                <td>Height</td>
                <td>{pokemon.height} m</td>
              </tr>
              <tr>
                <td>Weight</td>
                <td>{pokemon.weight} kg</td>
              </tr>
              <tr>
                <td>Abilities</td>
                <td>{pokemon.abilities.join(", ")}</td>
              </tr>
              </tbody>
          </table>
        </div>
      </div>
      <div className="card2">
        <div className="card-content">
          <table>
            <tbody>
              <tr>
                <td>Type</td>
                <td>{pokemon.types.join(", ")}</td>
              </tr>
              <tr>
                <td>Base Stats</td>
                <td>
                  {baseStatsName.map((name, index) => (
                    <span key={index}>
                      {name}: {pokemon.stats[index]}
                      <br />
                    </span>
                  ))}
                </td>
              </tr>
              <tr>
                <td>Egg Groups</td>
                <td>{pokemon.eggGroups}</td>
              </tr>
              <tr>
                <td>Catch Rate</td>
                <td>{pokemon.catchRate}%</td>
              </tr>
              <tr>
                <td>
                  <strong>
                    <u>Description</u>
                  </strong>
                </td>
                <td>{pokemonSpecie.description}</td>
              </tr>
              <tr>
                <td>
                  <strong>
                    <u>
                      <a href="https://bulbapedia.bulbagarden.net/wiki/Egg_Group">
                        Egg Groups
                      </a>
                    </u>
                  </strong>
                </td>
                <td>{pokemonSpecie.eggGroups}</td>
              </tr>
              </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default PokedexDetailPage