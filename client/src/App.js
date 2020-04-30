import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from './views/Login'
import SignUp from './views/SignUp'
import Homepage from './views/Homepage'
import Dashboard from './views/Dashboard'
import Header from './components/global/Header'
import Footer from './components/global/Footer'
import UserSettings from './views/UserSettings'

import { AuthContext } from './providers/Auth'

function App() {
  const { user } = useContext(AuthContext)

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/settings" component={UserSettings} />
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
