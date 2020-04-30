const MoodEntryController = require('../controllers/MoodEntryController')

module.exports = router => {
    router.get('/test/:user_id', MoodEntryController.getEntries)
    return router
}