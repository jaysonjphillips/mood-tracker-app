'use strict';
module.exports = (sequelize, DataTypes) => {
  const NotificationSchedule = sequelize.define('NotificationSchedule', {
    id: {
      primaryKey: true, 
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: DataTypes.UUID,
    notification_type: DataTypes.STRING,
    notification_time_utc: DataTypes.STRING
  }, {});
  NotificationSchedule.associate = function(models) {
    NotificationSchedule.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    })
  };
  return NotificationSchedule;
};