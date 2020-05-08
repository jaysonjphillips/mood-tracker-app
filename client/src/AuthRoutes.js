import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'

import Dashboard from './views/Dashboard'
import UserSettings from './views/UserSettings'

const AuthenticatedRoutes = () => {

    return (
        <Switch>
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/settings' component={UserSettings} />
            <Redirect to='/dashboard' from='*' />
        </Switch>
    )
}

export default AuthenticatedRoutes