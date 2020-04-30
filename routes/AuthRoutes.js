const AuthController = require('../controllers/AuthController')

module.exports = router => {
    /**
     * authentication and registration
     */
    router.post('/register', AuthController.registerUser)
    router.post('/login', AuthController.login)
    router.post('/logout', AuthController.logout)
    return router
}