'use strict';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dob: DataTypes.DATE,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    imgUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: DataTypes.TEXT,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      },
      allowNull: false
    },
    docPatient: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  User.associate = function(models){
    User.hasOne(models.Doctor);
    User.hasOne(models.Patient);
  };
  return User;
};
