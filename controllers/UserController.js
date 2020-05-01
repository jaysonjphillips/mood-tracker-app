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

    for (field in req.body) {
        user[field] = req.body[field]
    }

    await user.save()
    res.json(user)
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