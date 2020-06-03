const messaging = require('../services/messaging')
const email = require('../services/email')
const moment = require('moment-timezone')
const DB = require('../models')

const getEligibleSubmissionNotifications = async () => {
    const currentTime = moment.utc()
    const endTime = moment.utc(currentTime).add(59, 'minutes')

    const notifications = await DB.NotificationSchedule.findAll({
        include: {
            model: DB.User,
            include: {
                model: DB.UserSettings
            }
        }
    })
    return await notifications.filter(notification => {
        const {time_zone} = notification.User.UserSetting
        const convertedTime = moment.tz(moment(notification.User.UserSetting.evening), time_zone).utc()
        console.log(convertedTime.format('hh:mm A'), currentTime.format('hh:mm A'), convertedTime.isSame(currentTime, 'minute'))
        return convertedTime.isSame(currentTime, 'minute')
    })
}

const moodEntryWorker = async () => {
    const submitMoodNotifications = await getEligibleSubmissionNotifications()
    console.log(submitMoodNotifications)
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