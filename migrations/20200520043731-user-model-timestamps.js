'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction( tx => {
      return Promise.all([
        queryInterface.addColumn('Users', 'createdAt', {
          allowNull: false,
          type: Sequelize.DATE
        }, {transaction: tx}),
        queryInterface.addColumn('Users', 'updatedAt', {
          allowNull: false,
          type: Sequelize.DATE
        }, {transaction: tx})
      ])
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
