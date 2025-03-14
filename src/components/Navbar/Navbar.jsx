import React from 'react'
import "./Navbar.css"
import Navigation from '../Navigation/Navigation'

const Navbar = (props) => {
  const {onLogout} = props

  return (
    <header className="main-header">
        <h1>Typical Page</h1>
        <Navigation onLogout={onLogout}/>
    </header>
  )
}

export default Navbar