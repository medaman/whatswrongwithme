'use strict';

module.exports = (sequelize, DataTypes) => {
  var Patient = sequelize.define('Patient', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    biography: DataTypes.TEXT,
    insuranceProvider: DataTypes.STRING,
    insuranceType: DataTypes.STRING,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  Patient.associate = function(models){
    Patient.belongsTo(models.Doctor, {
      foreignKey: {
        allowNull: true
      }
    });
    Patient.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Patient;
};
