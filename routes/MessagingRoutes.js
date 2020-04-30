const MessagesController = require('../controllers/MessagesController')

module.exports = router => {
    router.post('/sms', MessagesController.receiveHook)
    return router
}