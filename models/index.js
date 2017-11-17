const fs        = require('fs');
const path      = require('path');
const {Cities, Product, User} = require('../model');
const CitySchema = require('./city');
const ProductsSchema = require('./product');
const UsersSchema = require('./user');

const mongoose = require('mongoose');
const connection = mongoose.createConnection('mongodb://localhost:27017/mydb');
const CitiesDB = connection.model('Cities', CitySchema);
const ProductsDB = connection.model('Product', ProductsSchema);
const UsersDB = connection.model('Users', UsersSchema);
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function() {
  CitiesDB.count((err, count) => {
    if (!err && count === 0) {
      const cities = new Cities();
      for (let city of cities) {
        const cityDocument = new CitiesDB(city);
        cityDocument.save(err => console.log(err));
      }
    }
  });
  ProductsDB.count((err, count) => {
    if (!err && count === 0) {
      const products = new Product();
      for (let product of products) {
        const productDocument = new ProductsDB(product);
        productDocument.save();
      }
    }
  });
  UsersDB.count((err, count) => {
    if (!err && count === 0) {
      const users = new User();
      for (let user of users) {
        const userDocument = new UsersDB(user);
        userDocument.save();
      }
    }
  });
});

exports.UsersDB = UsersDB;
exports.ProductsDB = ProductsDB;
exports.CitiesDB = CitiesDB;

