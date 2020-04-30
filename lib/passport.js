const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const {API_SECRET} = process.env
const {User} = require('../models')

// serialize user
passport.serializeUser(( user, done ) => {
    
    done(null, {id: user.id, username: user.email})
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
        if(!username.length || !password.length) return done({error: {message: "Please enter username & password"}})
        // query to find user by username
        const user = await User.findOne({where: {'email': username}})

        if(!user) {
            return done(null, false, {message: "Your username or password is incorrect"})
        } else if(!User.checkPassword(password, user.password)) {
            return done(null, false, {message: "Your username or password is incorrect"})
        } else {
           return done(null, user)
        }
    }
))

const jwtOpts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // JWT Extraction 
    secretOrKey: API_SECRET // secret for passport jwt
}

passport.use('jwt',
    new JWTStrategy(jwtOpts, async(payload, done) => {
        try {
            const user = await User.findOne({where: {id: payload.user.id}})
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