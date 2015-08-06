'use strict';

module.exports = function (sequelize, DataTypes) {
  var Response = sequelize.define('Response', {
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    anwserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function (models) {
        Response.belongsTo(models.User);
      }
    }
  });

  return Response;
};
