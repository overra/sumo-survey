'use strict';

var bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    instanceMethods: {
      verifyPassword: function (password, done) {
        return bcrypt.compare(password, this.password, done);
      }
    },
    classMethods: {
      associate: function (models) {
        User.hasMany(models.Response)
      }
    }
  });

  function hashPassword(password) {
    return new Promise(function (resolve, reject) {
      bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
          return rej(err);
        }

        resolve(hash);
      });
    });
  }

  function hashIfChanged(user, options) {
    if (!user.changed('password')) {
      return;
    }

    return hashPassword(user.password).then(function (hash) {
      user.password = hash;
    });
  }

  User.beforeCreate(hashIfChanged);
  User.beforeUpdate(hashIfChanged);

  return User;
};
