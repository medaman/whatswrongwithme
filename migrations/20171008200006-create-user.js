'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.DATE
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      imgUrl: {
        type: Sequelize.STRING
      },
      googleId: {
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.TEXT
      },
      email: {
        type: Sequelize.STRING
      },
      docPatient: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
      patientId: {
        type: Sequelize.INTEGER
/*        
        references: {
          model: "Patient",
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
    return queryInterface.dropTable('Users');
  }
};