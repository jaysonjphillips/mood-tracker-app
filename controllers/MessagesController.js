const {User, MoodEntry} = require('../models')
const MessagingService = require('../services/messaging')


module.exports = {
    receiveHook: async (req, res) => {
        const {SmsStatus, From, Body} = req.body

        const currentUser = await User.findOne({where: {phone: From}})

        if(currentUser && Body) {
            const newEntry = MoodEntry.create({
                user_id: currentUser.id,
                mood_rating: 0,  
                mood_comment: Body,
                mood_date: Date.now()
            })

            if(newEntry) {
                MessagingService.sendMessage({
                    body: "Thanks for sending us how you feel",
                    to: currentUser.phone
                })
            }
        } else {
            
        }
    }
}