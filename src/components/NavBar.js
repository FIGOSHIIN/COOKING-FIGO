import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'
import Searchbar from './Searchbar'
import { useTheme } from '../hooks/useTheme'

export default function Navbar() {

const { color, changeColor } = useTheme()

  return (
    <div className="navbar" style={{ background: color }}>
      <nav onClick={() => changeColor('pink')}>
        <Link to="/" className ="brand">
        <h1>Cooking Figo</h1>
        </Link>
        <Searchbar/>
        <Link to="/create" className="create-recipe">Create Recipe</Link>
      </nav>
    </div>
  )
}
