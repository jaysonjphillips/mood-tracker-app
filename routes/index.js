const router = require('express').Router({mergeParams: true})
const userRoutes = require('./UserRoutes')(router)

module.exports = app => {
    app.use('/api/user', userRoutes) // mount all user api routes
}