import React from 'react'
import "./Navigation.css"
import Button from '../ui/Button'
import AuthContext from '../../store/AuthContext'

const Navigation = (props) => {
  return (
    <AuthContext.Consumer>
      {context => (
        <nav className="nav">
            <ul>
                <li>
                    <a href="/users">Users</a>
                </li>
                <li>
                    <a href="/admin">Admin</a>
                </li>
                {context.loggedIn &&
                  <li>
                    <Button onClick={context.onLogout}>Logout</Button>
                  </li>
                }
            </ul>
        </nav>
      )}
    </AuthContext.Consumer>
  )
}

export default Navigation