const router = require('express').Router({mergeParams: true})
const authRoutes = require('./AuthRoutes')(router)
const userRoutes = require('./UserRoutes')(router)
const messageRoutes = require('./MessagingRoutes')(router)
const moodEntryRoutes = require('./MoodEntryRoutes')(router)
const passport = require('../lib/passport')

module.exports = app => {
    app.use('/api/auth', authRoutes)
    app.use('/api/user', passport.authenticate('jwt', {session: false}), userRoutes) // mount all user api routes
    app.use('/api/messages', passport.authenticate('jwt', {session: false}), messageRoutes) // mount all messaging routes + post-receive
    app.use('/api/entries', passport.authenticate('jwt', {session: false}), moodEntryRoutes)
}