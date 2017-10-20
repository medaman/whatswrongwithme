'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Users',
      'doctorId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: "Doctor",
          key: "id"
        }
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
