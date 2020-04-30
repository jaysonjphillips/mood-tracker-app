
const { PORT, NODE_ENV } = process.env

if(NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const session = require('express-session')
const passport = require('./lib/passport')
const bodyParser = require('body-parser')
const db = require('./models')
const cronJob = require('cron').CronJob;

const app = express()
app.use(express.json())

app.use(session({
    secret: process.env.APP_SESSION_SECRET, 
    resave: false, //required
    saveUninitialized: false //required
}))

app.use(passport.initialize())
app.use(passport.session()) 
app.use(bodyParser.urlencoded({extended: false}))

require('./routes')(app)
const {smsPromptWorker} = require('./workers/sms')

if (NODE_ENV === 'production') {
    app.use(express.static('client/build'))
}

db.sequelize.authenticate()
.then(() => {
    app.listen(PORT, async () => {
        console.log("started")
        for (model in db) {
            if(model !== "sequelize" && model !== "Sequelize") {
                await db[model].sync({force: true})
            }
        }

        const newUser = await db.User.create({
            first_name: 'Test',
            last_name: 'Tester',
            email: 'test@testing.com',
            phone: '1111111111',
            password: 'test1234'
        })

        if(newUser) {
            console.log(await db.User.findAll())
            await db.UserSettings.fakeData(newUser.id)
            // smsPromptWorker()
            new cronJob('0 * * * *', smsPromptWorker, null, true)
        }
    })
})
.catch( err => console.log(err))

