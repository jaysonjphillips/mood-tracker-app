const {MoodEntry, User} = require('../models')

module.exports = {
    getEntries: async (req, res) => {
        
        const user = await User.findOne({
            where: {
                id: req.user.id
            },
            include: MoodEntry,
            attributes: {
                exclude: ['password']
          }})
        if(!user) return res.status(400).end()
        delete user.password
        res.json(user)
    }
}