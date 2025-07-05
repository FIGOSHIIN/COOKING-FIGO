import React, { useEffect, useRef } from 'react'
import './Create.css'
import { useState } from 'react'
import { projectFirestore } from '../../firebase/config'
import { useNavigate } from 'react-router-dom'


export default function Create() {
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [isPending, setIsPending] = useState(false) 
  const [error, setError] = useState(null) 

  const ingredientsInput = useRef(null)
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsPending(true) 
    setError(null) 
    const newRecipe = { 
      title,
      ingredients,
      method,
      cookingTime: cookingTime + ' minutes',
      createdAt: new Date() 
    }

    try {
      await projectFirestore.collection('recipes').add(newRecipe)
      setIsPending(false) 
      navigate('/') 
    } catch (err) {
      console.error("Error adding document:", err.message) 
      setError("Failed to add recipe. Please try again.") 
      setIsPending(false) 
    }
  }

  const handleAdd = (e) => {
    e.preventDefault()
    const ing = newIngredient.trim()

    if (ing && !ingredients.includes(ing)) {
      setIngredients(prevIngredients => [...prevIngredients, ing])
    }
    setNewIngredient('')
    ingredientsInput.current.focus()
  }

  return (
    <div className='create'>
      <h2 className='page-title'>Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Title:</span>
          <input type='text'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required />
        </label>

        <label>
          <span>Recipe ingredients:</span>
          <div className='ingredients'>
            <input type='text'
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientsInput}
            />
            <button onClick={handleAdd} className='btn'>add</button>
          </div>
        </label>

        <p>current ingredients: {ingredients.map(i => <em key={i}>{i}, </em>)}</p>


        <label>
          <span>Recipe method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>


        <label>
          <span>Cooking time (minutes):</span>
          <input type='number'
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>

        {!isPending && !error && <button className='btn'>submit</button>}
        {isPending && <button className='btn' >Submit</button>}
        {error && <p className='error'>{error}</p>} {}
      </form>
    </div>
  )
}