import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from "../pages/HomePage/HomePage"
import PokedexPage from "../pages/PokedexPage/PokedexPage"
import PokedexDetailPage from "../pages/PokedexDetailPage/PokedexDetailPage"
import ErrorPage from "../pages/ErrorPage/ErrorPage"


const Router = () => {
    return(
       <BrowserRouter>
          <Routes>
             <Route index element={<HomePage />}/>
             <Route path='pokedex' element={<PokedexPage />}/>
             <Route path='pokedex/detail' element={<PokedexDetailPage />}/>
             <Route path='*' element={<ErrorPage />}/>
          </Routes>
       </BrowserRouter>
      )
}

export default Router