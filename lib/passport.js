const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

passport.use(new LocalStrategy(
    function(username, password, done) {
        // query to find user by username

        // if there's an error, call done(err)

        // if there's no error, but no result, return done(message: "incorrect username")

        // if password check for user fails, return done(message: "incorrect password")

        // if successful, return done(null, user)
    }
))
