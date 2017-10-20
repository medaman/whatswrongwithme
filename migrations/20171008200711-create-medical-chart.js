'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MedicalCharts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patientId: {
        type: Sequelize.INTEGER
/*
        references: {
          model: "Patient",
          key: "id"
        }
*/
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
      comment: {
        type: Sequelize.TEXT
      },
      isDrComment: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      mediaId: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('MedicalCharts');
  }
};