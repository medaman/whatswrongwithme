'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Doctors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hospitalId: {
        type: Sequelize.INTEGER
/*
        references: {
          model: "Hospital",
          key: "id"
        }
*/
      },
      insuranceProviderId: {
        type: Sequelize.INTEGER
/*
        references: {
          model: "InsuranceProvider",
          key: "id"
        }
*/
      },
      drRating: {
        type: Sequelize.STRING
      },
      specialization: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
/*
        references: {
          model: "User",
          key: "id"
        }
*/
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Doctors');
  }
};