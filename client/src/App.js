import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './components/global/Header'
import Footer from './components/global/Footer'
import { AuthContext } from './providers/Auth'

import AuthenticatedRoutes from './AuthRoutes'
import PublicRoutes from './PublicRoutes'

function App() {
  const { user } = useContext(AuthContext)

  return (
    <Router>
      <Header />
      {user.isLoggedIn ? 
        <AuthenticatedRoutes /> :
        <PublicRoutes />
      }
      <Footer />
    </Router>
  )
}

export default App
