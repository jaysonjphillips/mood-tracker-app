const bcrypt = require('bcrypt')
const messaging = require('../services/messaging')
const moment = require('moment-timezone')
const Op = require('sequelize').Op
const {UserSettings, MoodEntry} = require('./index')

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            primaryKey: true, 
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        first_name: {
            type: DataTypes.STRING,
            required: true,
            validate: {
                min: 3
            },
            allowNull: false
        },
        last_name: {             
            type: DataTypes.STRING,
            required: true,
            validate: {
                min: 3
            }
        },
        email: {
            type: DataTypes.STRING,
            required: true,
            unique: true,
            validate: {
                min: 3
            }, 
            allowNull: false
        }, 
        password: {
            type: DataTypes.STRING,
            required: true,
            validate: {
                min: 9
            }, 
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            required: true,
            unique: true,
            validate: {
                validateMobile: async function(value) {
                    const isValid = this.phone.match(/^1?[-\. ]?(\(\d{3}\)?[-\. ]?|\d{3}?[-\. ]?)?\d{3}?[-\. ]?\d{4}$/)
                    if(!isValid) {
                        throw new Error('Please enter a valid US phone number')
                    }
                    // } else {
                    //     try {
                    //         const isMobile = await messaging.phoneValidator(this.phone)
                    //         if(!isMobile) {
                    //             throw new Error('Please enter a valid sms-enabled phone number.')
                    //         }
                    //         this.phone_formatted = isMobile[1]
                    //     } catch (err) {
                    //         throw new Error('Please enter a valid sms-enabled phone number.')
                    //     }

                    // }
                }
            }, 
            allowNull: false
        },
        phone_formatted: {
            type: DataTypes.STRING,
            required: false
        } 
    })

    User.hashPassword = ( user => user.password = bcrypt.hashSync(user.password, 10))

    // hooks
    User.beforeCreate( user => {
        User.hashPassword(user)
    })

    User.checkPassword = (passwordEntry, hashedPassword) => {
        // compare hashed password
        return bcrypt.compareSync(passwordEntry, hashedPassword) 
    }

   User.associate = function(models) {
        User.hasMany(models.MoodEntry, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE'
        })

        User.hasOne(models.UserSettings, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE'
        })

        User.hasMany(models.NotificationSchedule, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE'
        })
      };

      User.notificationCheck = async () => {
        const currentTime = moment().utc()
        const endTime = moment(currentTime).add(59, 'minutes')
        
        const allUsers = await User.findAll({include: UserSettings})
        const currentEntries = allUsers.map( async user => {
            return await MoodEntry.findAll({
                where: {
                    [Op.and]: [{
                            user_id: user.id
                        },
                        {
                            mood_date: moment().tz(user.UserSettings.time_zone).format('YYYY-MM-DD')
                        }]
                }
            })
        })
      }


    return User;
}