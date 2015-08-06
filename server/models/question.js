'use strict';

module.exports = function (sequelize, DataTypes) {
  var Question = sequelize.define('Question', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function (models) {
        Question.hasMany(models.Answer);
      }
    }
  });

  return Question;
};
