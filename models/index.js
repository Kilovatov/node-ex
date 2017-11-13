const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(__filename);
const env       = process.env.NODE_ENV || 'development';
const db        = {};
const Product = require('../model/product');


const sequelize = new Sequelize('postgres', 'postgres', null, {
  host: '192.168.99.100',
  dialect: 'postgres',
  port: '32772',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
const defaultProducts = new Product();
db.Products.count().then(res => {
  if (!res.length) {
    db.Products.bulkCreate(defaultProducts);
  }
});


module.exports = db;
