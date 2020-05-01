const {get, create} = require('../controllers/NotificationScheduleController')

module.exports = router => {
    router
        .route('/schedule')
        .post(create)
        .get(get)

    return router
}