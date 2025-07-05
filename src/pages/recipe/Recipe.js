
import React, { useEffect, useState } from 'react';
import './Recipe.css';
import { useParams } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { projectFirestore } from '../../firebase/config';

export default function Recipe() {
  const { id } = useParams();
  const { mode } = useTheme();

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null); 

  

  useEffect(() => {
    setIsPending(true); 
    setError(null);     

    
    const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot((doc) => {
        if (doc.exists) {
          
          setRecipe({ id: doc.id, ...doc.data() });
          setIsPending(false); 
        } else {
          
          setError('Could not find that recipe');
          setIsPending(false); 
        }
      })
      
       return () => unsub()
  }, [id]); 

  const handleClick = () =>{
    projectFirestore.collection("recipes").doc(id).update({
      title:"something completly diff"
    })
  }

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {recipe && (
        <>
          <h2 className='page-title'>{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients && Array.isArray(recipe.ingredients) && recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
          </ul>
          <p className='method'>{recipe.method}</p>
          <button onClick={handleClick}>Update me</button>
        </>
      )}
      {!isPending && !recipe && !error && <p>Recipe details will appear here.</p>}
    </div>
  );
}