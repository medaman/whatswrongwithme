'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Patients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      insuranceProviderId: {
        type: Sequelize.INTEGER
/*
        references:{
          model: "InsuranceProvider",
          key: "id"
        }
*/
      },
      biography: {
        type: Sequelize.TEXT
      },
      doctorId: {
        type: Sequelize.INTEGER
/*
        references: {
          model: "Doctor",
          key: "id"
        }
*/
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
      hospitalId: {
        type: Sequelize.INTEGER
/*
        references: {
          model: "Hospital",
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
    return queryInterface.dropTable('Patients');
  }
};