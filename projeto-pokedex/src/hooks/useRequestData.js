import React from "react"
import { useEffect, useState } from "react"
import axios from "axios"

export const useRequestData = (url, estadoInicial) => {

  const [respApi, setrespApi] = useState(estadoInicial)

    useEffect(()=>{
      axios.get(url)
      .then((res)=> {
           console.log(res.data.results)
           setrespApi(res.data.results)
        })
         .catch((err)=> {
           console.log(err)
        })
    }, [url])

    return respApi
}