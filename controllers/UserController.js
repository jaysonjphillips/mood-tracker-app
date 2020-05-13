const {User, UserSettings} = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const getUser = async (req, res) => {
    const user = await User.findOne({where: {id: req.user.id}})
    delete user.password
    if(!user) return res.status(400).end()
    res.json(user)
}

const updateUser = async (req, res) => {
    const user = await User.findOne({where: {id: req.user.id}})
    if(!user) return res.status(400).end()

    const {password = null, confirm_password = null} = req.body

    if(password && confirm_password) {
        // check password
        if(confirm_password === password){
            if(!User.checkPassword(password, user.password)) {
                user.password = password
                User.hashPassword(user)
            } 
        else {
            return res.status(400).json({message: "Passwords do not match"})
        }
    } else if(!password && !confirm_password && Object.keys(req.body).length) {
            for (field in req.body) {
                user[field] = req.body[field]
            }
        }
    } else {
        return res.status(400).json({message: "Passwords do not match"})
    }

    await user.save()
    res.json(user)
}

const userCheck = async (req, res) => {
    if(!req.user) return res.status(401).end()
}

const getSettings = async (req, res) => {
    const user = await User.findOne({where: {id: req.user.id}, include: UserSettings})
    delete user.password
    if(!user) return res.status(404).end()
    res.json(user)
}

const updateSettings =  async (req, res) => {
    const existingSettings = await UserSettings.findOne({where: {user_id: req.user.id}})
    if(!userSettings) return res.status(404).end()

    for (setting in req.body) {
        userSettings[setting] = req.body[setting]
    }

    await userSettings.save()
    res.json(userSettings)
}

const createSettings =  async (req, res) => {
    const existingSettings = await UserSettings.findOne({where: {user_id: req.user.id}})
    if(existingSettings) return res.status(500).end()

    console.log({...req.body})

    const newSettings = await UserSettings.create({
        user_id: req.user.id,
        ...req.body
    })

    if(!newSettings) return res.status(400).end()
    res.json(newSettings)
}

module.exports = {
    getUser,
    updateUser,
    getSettings,
    updateSettings,
    createSettings
}