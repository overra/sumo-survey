'use strict';

module.exports = function (sequelize, DataTypes) {
  var Answer = sequelize.define('Answer', {
  }, {
    classMethods: {
      associate: function (models) {
        Answer.belongsTo(models.User);
        Answer.belongsTo(models.Choice);
        Answer.belongsTo(models.Question);
      }
    }
  });

  return Answer;
};
