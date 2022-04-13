import React from "react"
import { goToHome } from "../../routes/Coodinator"
import { useNavigate } from "react-router-dom"

const PokedexPage = () => {
  const navigate = useNavigate()
  return (
    <>
       <h1>Pokedex</h1>
       <button onClick={() => goToHome(navigate)}>Voltar para a lista de pokemons</button>

    </>
  )
}

export default PokedexPage