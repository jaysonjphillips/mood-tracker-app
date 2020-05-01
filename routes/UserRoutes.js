const {
    getUser, 
    updateUser, 
    getSettings, 
    updateSettings,
    createSettings
} = require('../controllers/UserController')

module.exports = router => {
    /**
     * user retrieval and management
     */
    router
        .route('/')
        .get(getUser)
        .put(updateUser)
    
    router
        .route('/settings')
        .get(getSettings)
        .put(updateSettings)
        .post(createSettings)

    return router
}