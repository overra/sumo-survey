'use strict';

module.exports = function (sequelize, DataTypes) {
  var Choice = sequelize.define('Choice', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    choice: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function (models) {
        Choice.belongsTo(models.Question);
      }
    }
  });

  return Choice;
};
