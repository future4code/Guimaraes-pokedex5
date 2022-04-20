import React from "react"
import { goToPokedex } from '../../routes/Coodinator.js'
import { useNavigate } from 'react-router-dom'
import { useRequestData } from "../../hooks/useRequestData.js"
import { BASE_URL } from "../../constants/Urls.js"

const HomePage = () => {
  const navigate = useNavigate()
  const pokemon = useRequestData(`${BASE_URL}`, [])
  console.log('Home', pokemon.results)
 
  return (
    <>
       <h1>Lista de Pokémon</h1>
       <button onClick={() => goToPokedex(navigate)}>Ir para Pokedex</button>
       <div>
         {pokemon.results?.map((pk,index)=>{
           return(<p key={index}>{pk.name}</p>)
         }) }
       </div>
    </>
  )
}

export default HomePage