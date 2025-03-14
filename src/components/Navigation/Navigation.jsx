import React from 'react'
import "./Navigation.css"
import Button from '../ui/Button'

const Navigation = (props) => {
  const {isAuthenticated, onLogout} = props

  return (
    <nav className="nav">
        <ul>
            <li>
                <a href="/users">Users</a>
            </li>
            <li>
                <a href="/admin">Admin</a>
            </li>
            {isAuthenticated &&
              <li>
                <Button onClick={onLogout}>Logout</Button>
              </li>
            }
        </ul>
    </nav>
  )
}

export default Navigation