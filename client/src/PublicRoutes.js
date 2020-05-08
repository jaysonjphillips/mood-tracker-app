import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Login from './views/Login'
import SignUp from './views/SignUp'
import Homepage from './views/Homepage'

const PublicRoutes = () => { return (
    <>
        <Switch>
            <Route exact path='/' component={Homepage} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Redirect 
                to={{
                    pathname: '/login',
                    state: {referrer: window.location.pathname},
                }} 
                from='*'
            />
        </Switch>
    </>
)}

export default PublicRoutes