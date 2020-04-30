const {User} = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const getUser = async (req, res) => {
    const user = await User.findOne({where: {id: req.user.id}})
    delete user.password
    if(!user) return res.status(404).end()
    res.json(user)
}

module.exports = {
    getUser,
}