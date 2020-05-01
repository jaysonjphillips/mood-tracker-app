const messaging = require('../services/messaging')
const email = require('../services/email')
const moment = require('moment-timezone')
const DB = require('../models')

const currentTime = moment().utc()
const endTime = moment(currentTime).add(59, 'minutes')

const getEligibleSubmissionNotifications = async () => {
    const afternoonNotifications = await DB.NotificationSchedule.findAll({
        where: {
            notification_type: "Afternoon"
        },
        include: {
            model: DB.User,
            include: {
                model: DB.UserSettings
            }
        }
    })

    return await afternoonNotifications.filter(notification => {
        const {time_zone} = notification.User.UserSetting
        
        const convertedTime = moment('4:30 pm', 'hh:mm A').tz(time_zone).utc() 
        return convertedTime.isAfter(currentTime) && convertedTime.isBefore(endTime)
    })
}

const moodEntryWorker = async () => {
    const submitMoodNotifications = await getEligibleSubmissionNotifications()
    submitMoodNotifications.forEach(async entry => {
            
        messaging.sendMessage(
            `${entry.notification_type} In a short phrase, tell us how you're feeling`, 
            entry.User.phone
        )

        email.sendEmail(entry.User.email, "Testing", "Testing sendmail for hackathon app")
    });
}

module.exports = {
    moodEntryWorker
}