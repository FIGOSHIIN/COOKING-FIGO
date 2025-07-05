import React from 'react'
import './RecipeList.css'
import {Link} from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import trashcan  from '../assets/delete.svg'
import { projectFirestore } from '../firebase/config'
export default function RecipeList({recipes}) {
  const { mode } = useTheme()

  const handleClick = (id)=> {
    projectFirestore.collection('recipes').doc(id).delete()
  }

  return (
    <div className='recipe-list'>
      {recipes.map(recipe =>(
            <div key={recipe.id} className={`card ${mode}`}>
                <h3>{recipe.title}</h3>
                <p>{recipe.cookingTime} to make.</p>
                <div>{recipe.method.substring(0, 100)}...</div>
                <Link to={`/recipes/${recipe.id}`}>Cook this</Link>
                <img
                className='delete'
                src={trashcan}
                onClick={() => handleClick(recipe.id)}
                />
            </div>
      ))}
    </div>
  )
}
