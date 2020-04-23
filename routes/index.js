const router = require('express').Router()
const userController = require('../controllers/UserController')


module.exports = app => {
    app.use('/api/user', () => {}) // mount all user api routes
}