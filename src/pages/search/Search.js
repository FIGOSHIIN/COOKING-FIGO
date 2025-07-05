import React from 'react'
import './Search.css'
import { useLocation } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import RecipeList from '../../components/RecipeList'

export default function Search() {
  const queryString = useLocation().search
  const queryParams = new URLSearchParams(queryString)
  const query = queryParams.get('q')

  const url = 'http://localhost:3000/recipes' 
  const { data, isPending, error } = useFetch(url)


  const filteredData = data
    ? data.filter(recipe =>
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(query.toLowerCase())
        ) ||
        recipe.method.toLowerCase().includes(query.toLowerCase())
      )
    : []

  return (
    <div>
      <h2 className='page-title'>Recipes including "{query}"</h2>

      {error && <p className='error'>{error}</p>}
      {isPending && <p className="loading">Loading...</p>}

      {filteredData.length > 0 && <RecipeList recipes={filteredData} />}

      {!isPending && filteredData.length === 0 && (
        <p className='error'>No recipes found matching "{query}"</p>
      )}
    </div>
  )
}
