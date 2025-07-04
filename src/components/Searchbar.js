import './Searchbar.css';
import { useState } from 'react';
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Searchbar() {
    const [term, setTerm] = React.useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        // ?q=
        navigate(`/search?q=${term}`)
    }

  return (
    <div className='searchbar'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='search'>Search:</label>
        <input type='text'
        id='search'
        onChange={(e) => setTerm(e.target.value)}
        required
        />
      </form>
    </div>
  )
}
