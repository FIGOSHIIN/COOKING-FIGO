import React from 'react'
import './Home.css'
import { projectFirestore } from '../../firebase/config'  
import { useEffect } from 'react'
import { useState } from 'react'
import RecipeList from '../../components/RecipeList'


export default function Home() {
  const [data, setData] = React.useState(null)
  const [isPending, setIsPending] = React.useState(false)
  const [error, setError] = React.useState(false)
  
  
  useEffect(() => {
     setIsPending(true)

     projectFirestore.collection('recipes').get().then((snapshot) => {
        if (snapshot.empty){
          setError('No recipes to load')
          setIsPending(false)
        }else{
          let results = []
          snapshot.docs.forEach(doc => {
            results.push({ id: doc.id, ...doc.data()})
          })
          setData(results)
          setIsPending(false)
        }
     }).catch(err =>{
      setError(err.message)
      setIsPending(false)
     })
    }, [])
  
  return (
    <div className='home'>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}
