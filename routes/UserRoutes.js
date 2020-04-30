const UserController = require('../controllers/UserController')

module.exports = router => {
    /**
     * user retrieval and management
     */
    router.get('/', UserController.getUser)
    return router
}