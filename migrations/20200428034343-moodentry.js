'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('mood_entries', {
      id: {
        primaryKey: true, 
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      mood_rating: DataTypes.INTEGER,
      mood_comment: DataTypes.TEXT,
      mood_date: DataTypes.DATE
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
