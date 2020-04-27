const {User} = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const getUser = async (req, res) => {
    const userId = req.params.userId

    const user = await User.findOne({where: {id: userId}})
    if(!user) return res.status(404).end()
    res.json(user)
}

const registerUser = async (req, res) => {
    const {username, password, phone} = req.body

    const newUser = await User.create({
        email: username, 
        password: password,
        phone: phone
    })

    if(!newUser) return res.status(400).json({error: {message: "Error registering User"}})
    res.status(201).json({message: "user created"})
}

const login = async (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
        try {
            if(err) console.error(err)
            if(info !== undefined) return res.send(info)
            req.login(user, {session: false}, async error => {
                if(error) return next(error)
                const body = {id: user.id, username: user.email}
                const token = jwt.sign({user: body}, process.env.API_SECRET)
                return res.json({token})
            })
        } catch (err) {
            return next(err)
        }
    })(req, res, next)
    
    if(loginUser) {
        const isValid = User.checkPassword(password, loginUser.password)
        if(isValid) return res.json(loginUser)
        res.json({error: {message: "password invalid"}})
    } else {
        res.status(400).json({error: {message: "username or password invalid"}})
    }
}

const logout = (req, res) => {
    if(req.user) {
        req.logout()
        res.json({message: "you have been successfully logged out"})
    } else {
        res.json({})
    }
}

module.exports = {
    getUser,
    registerUser,
    login,
    logout
}