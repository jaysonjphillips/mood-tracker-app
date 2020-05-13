if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const { PORT, NODE_ENV } = process.env

const express = require('express')
const session = require('express-session')
const passport = require('./lib/passport')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const db = require('./models')
const cronJob = require('cron').CronJob;

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: process.env.APP_SESSION_SECRET, 
    resave: false, //required
    saveUninitialized: false //required
}))

app.use(passport.initialize())
app.use(passport.session()) 
app.use(bodyParser.urlencoded({extended: false}))

require('./routes')(app)
const workers = require('./workers/notification')

if (NODE_ENV === 'production') {
    app.use(express.static('client/build'))
}

db.sequelize.authenticate()
.then(() => {
    app.listen(PORT, async () => {

        for (model in db) {
            if(model !== "sequelize" && model !== "Sequelize") {
                await db[model].sync({force: true})
            }
        }

        new cronJob('0 * * * *', workers.moodEntryWorker, null, true)
    })
})
.catch( err => console.error(err))

