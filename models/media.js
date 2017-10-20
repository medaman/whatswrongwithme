'use strict';
module.exports = (sequelize, DataTypes) => {
  var Media = sequelize.define('Media', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    filename: DataTypes.STRING,
    location: DataTypes.STRING,
    type: DataTypes.STRING,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  Media.associate = function(models){
    Media.belongsTo(models.Patient, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  
  return Media;
};