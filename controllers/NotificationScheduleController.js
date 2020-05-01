const {User, UserSettings, NotificationSchedule} = require('../models')

module.exports = {
    get: async (req, res) => {
        const user = await User.findOne({where: {
            id: req.user.id
        },
            include: [UserSettings, NotificationSchedule]
        })

        res.json(user)
    },
    create: async (req, res) => {
        const newSchedule = await NotificationSchedule.create({
            user_id: req.user.id,
            notification_type: req.body.type,
            notification_time_utc: req.body.time
        })

        res.json(newSchedule)
    }
}