'use strict'

const moment = require('moment-timezone')
const {User} = require('./User')

module.exports = (sequelize, DataTypes) => {
  const UserSettings = sequelize.define('UserSettings', {
    id: {
      primaryKey: true, 
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: DataTypes.UUID, 
    frequency: DataTypes.INTEGER,
    morning: DataTypes.STRING,
    afternoon: DataTypes.STRING,
    evening: DataTypes.STRING,
    time_zone: DataTypes.STRING
  }, {});
  UserSettings.associate = function(models) {
    UserSettings.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    })
  };

  UserSettings.beforeSave( setting => {
    let {morning, afternoon, evening, time_zone} = setting
    setting.morning = morning && moment.tz(morning, 'hh:mm A', time_zone).utc().format()
    setting.afternoon = afternoon && moment.tz(afternoon, 'hh:mm A', time_zone).utc().format()
    setting.evening = evening && moment.tz(moment(evening, 'hh:mm A'), time_zone).utc().format()
  })

  UserSettings.fakeData = async (id) => {
    const settings = await UserSettings.create({
      user_id: id,
      frequency: 3,
      morning: '9:00 am',
      afternoon: '1:00 pm',
      evening: '6:00 pm',
      time_zone: 'America/Los_Angeles'
    })
  }
  return UserSettings;
}; 