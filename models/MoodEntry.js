module.exports = (sequelize, DataTypes) => {
  const MoodEntry = sequelize.define('MoodEntry', {
    id: {
      primaryKey: true, 
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: DataTypes.UUID, 
    mood_rating: DataTypes.INTEGER,
    mood_comment: DataTypes.TEXT,
    mood_date: DataTypes.DATEONLY,
    mood_prompt: DataTypes.STRING
  }, {});
  MoodEntry.associate = function(models) {
    MoodEntry.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    })
  };

  return MoodEntry;
};