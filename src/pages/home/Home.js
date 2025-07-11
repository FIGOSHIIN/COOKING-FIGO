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

     const unsub = projectFirestore.collection('recipes').onSnapshot((snapshot) => {
      
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
     }, (err) => {
      setError(err.message)
      setIsPending(false)
     })

     return () => unsub()

    }, [])
  
  return (
    <div className='home'>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}
