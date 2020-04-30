const messaging = require('../services/messaging')
const email = require('../services/email')
const moment = require('moment-timezone')
const {User, UserSettings, MoodEntry, Sequelize} = require('../models')

    // const currentTime = moment().utc()
    // const endTime = moment(currentTime).add(59, 'minutes')
    // 
    // const allUsers = await UserSettings.findAll({include: User})
    // const readyToSend = allUsers.filter(profile => {
    //   const convertedTime = moment(profile.morning, 'h:mm a').tz(profile.time_zone).utc() 
    //   return convertedTime.isAfter(currentTime) && convertedTime.isBefore(endTime)
    // })
    // return readyToSend

const notificationCheck = async () => {
      const currentTime = moment().utc()
      const endTime = moment(currentTime).add(59, 'minutes')

      const allUsers = await User.findAll({include: UserSettings})

      const userEntries = {}
      const preppedUsers = allUsers.map( async user => {
          userEntries[user.id] = 0
          const currentEntries = await MoodEntry.findAll({
              where: {
                  [Sequelize.Op.and]: [{
                          user_id: user.id
                      },
                      {
                          mood_date: moment().tz(user.UserSetting.time_zone).toDate()
                      }]
              }
          })
          user.prompt = 
            currentEntries.length === 3 ? null :
            currentEntries.length === 2 ? 'evening' : 
            currentEntries.length === 1 ? 'afternoon' :
            'morning'

            return user
        })

        return preppedUsers.filter( async user => {
            let currentUser = await user
            const convertedTime = moment(currentUser.UserSetting[currentUser.prompt], 'h:mm a').tz(currentUser.UserSetting.time_zone).utc() 
            return convertedTime.isAfter(currentTime) && convertedTime.isBefore(endTime)
        })
}

const smsPromptWorker = async () => {
   const users = await notificationCheck()
   users.forEach(async receiver => {
       let user = await receiver
        messaging.sendMessage(`${user.prompt.toUpperCase()} In a short phrase, tell us how you're feeling`, user.phone)
        email.sendEmail(user.email, "Testing", "Testing sendmail for hackathon app")
    });

}

module.exports = {
    smsPromptWorker
}