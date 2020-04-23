const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/User')

passport.use(new LocalStrategy(
    async function(username, password, done) {
        // query to find user by username
        const user = await User.findOne({where: {'email': username}})

        if(!user) {
            done(null, false, {error: {message: "Username not found"}})
        } else if(!user.checkPassword(password)) {
            done(null, false, {error: {message: "Invalid Password"}})
        } else {
            done(null, user)
        }
    }
))
