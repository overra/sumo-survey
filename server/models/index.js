'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import {db as config} from '../../config';

var sequelize = new Sequelize(config.name, config.user, config.password, {
  host: config.host,
  port: config.port,
  logging: function(){}
});
var db = {};

fs.readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
