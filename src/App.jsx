import { Fragment, useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import AuthContext from './store/AuthContext'

function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    const loggedData = localStorage.getItem("isLogged")
    const parsedData = JSON.parse(loggedData)

    if (parsedData !== null) {
      return parsedData
    }
    else {
      return false
    }
  })

  useEffect(() => {
    const loggedData = localStorage.getItem("isLogged")
    const parsedData = JSON.parse(loggedData)
    
    if (parsedData != null) {
      if (parsedData.isLogged === true) {
        setLoggedIn(true)
      }
    }
  }, [])

  const loginHandler = (email, password) => {
    const loggedUser = localStorage.setItem("isLogged", JSON.stringify({
      email: email,
      isLogged: true
    }))

    setLoggedIn(true)
  }

  const logoutHandler = () => {
    localStorage.removeItem("isLogged")
    setLoggedIn(false)
  }

  return (
    <Fragment>
      <AuthContext.Provider value={
        {
          loggedIn: loggedIn,
          onLogout: logoutHandler
        }
      }>
        <Navbar onLogout={logoutHandler}/>
        <main>
          {!loggedIn && <Login onLogin={loginHandler}/>}
          {loggedIn && <Home/>}
        </main>
      </AuthContext.Provider>
    </Fragment>
  )
}

export default App
