const {User, UserSettings, NotificationSchedule} = require('../models')
const moment = require('moment-timezone')

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
        const user = await UserSettings.findOne({where: {user_id: req.user.id}})

        const newSchedule = await NotificationSchedule.create({
            user_id: req.user.id,
            notification_type: req.body.type,
            notification_time_utc: moment.tz(moment(req.body.time, 'hh:mm A'), user.time_zone).utc().format()
        })

        res.json(newSchedule)
    }
}