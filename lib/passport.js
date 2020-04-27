const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const {API_SECRET} = process.env
const {User} = require('../models')

// serialize user
passport.serializeUser(( user, done ) => {
    done(null, {id: user.id})
})

//deserialization
passport.deserializeUser(( id, done ) => {
    const user = User.findOne({where: {id: id}})
    if(user) {
        done(null, user)
    } else {
        done({error: {message: "user not found"}})
    }
})



passport.use(new LocalStrategy(
    async function(username, password, done) {
        // query to find user by username
        const user = await User.findOne({where: {'email': username}})

        if(!user) {
            done(null, false, {error: {message: "Username not found"}})
        } else if(!User.checkPassword(password, user.password)) {
            done(null, false, {error: {message: "Invalid Password"}})
        } else {
            done(null, user)
        }
    }
))

const jwtOpts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'), // JWT Extraction 
    secretOrKey: API_SECRET // secret for passport jwt
}

passport.use('jwt',
    new JWTStrategy(jwtOpts, async(payload, done) => {
        try {
            const user = await User.findOne({where: {'email': payload.username}})
            if(user) {
                done(null, user)
            } else {
                done(null, false)
            }
        } catch (err) {
            done(err)
        }
    })
)

module.exports = passport