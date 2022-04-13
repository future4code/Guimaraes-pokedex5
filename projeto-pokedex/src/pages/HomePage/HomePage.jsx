import React from "react"
import { goToPokedex } from '../../routes/Coodinator.js'
import { useNavigate } from 'react-router-dom'
import { useRequestData } from "../../hooks/useRequestData.js"
import { BASE_URL } from "../../constants/Urls.js"

const HomePage = () => {
  const navigate = useNavigate()
  const pokemon = useRequestData(`${BASE_URL}`)


  return (
    <>
       <h1>Lista de Pokémon</h1>
       <p>{pokemon}</p>
       <button onClick={() => goToPokedex(navigate)}>Ir para Pokedex</button>
    </>
  )
}

export default HomePage