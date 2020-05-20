'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('mood_entries', {
      id: {
        primaryKey: true, 
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      user_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      mood_rating: Sequelize.INTEGER,
      mood_comment: Sequelize.TEXT,
      mood_date: Sequelize.DATE,
      mood_prompt: Sequelize.STRING
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
