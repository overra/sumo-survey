'use strict';

module.exports = function (sequelize, DataTypes) {
  var Answer = sequelize.define('Answer', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    anwser: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function (models) {
        Answer.belongsTo(models.Question, {
          foreignKey: 'question_id'
        });
      }
    }
  });

  return Answer;
};
