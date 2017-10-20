'use strict';

module.exports = (sequelize, DataTypes) => {
  var Doctor = sequelize.define('Doctor', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    specialization: DataTypes.STRING,
    betterDoctorId: DataTypes.STRING,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  Doctor.associate = function(models){
    Doctor.hasMany(models.Patient);
    Doctor.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Doctor;
};
