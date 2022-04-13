import React from "react"
import { goToPokedex } from '../../routes/Coodinator.js'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()
  return (
    <>
       <h1>Lista de Pokémon</h1>
       <button onClick={() => goToPokedex(navigate)}>Ir para Pokedex</button>
    </>
  )
}

export default HomePage