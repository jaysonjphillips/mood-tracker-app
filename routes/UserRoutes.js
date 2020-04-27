const UserController = require('../controllers/UserController')

module.exports = router => {
    /**
     * user retrieval and management
     */
    router.get('/:userId', UserController.getUser)

    /**
     * authentication and registration
     */
    router.post('/register', UserController.registerUser)
    router.post('/login', UserController.login)
    router.post('/logout', UserController.logout)
    return router
}