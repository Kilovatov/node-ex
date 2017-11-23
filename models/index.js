const City = require('./city');
const Product = require('./product');
const User = require('./user');
const {DefaultProductsList, DefaultCitiesList, DefaultUsersList} = require('./../model');

exports.User = User;
exports.Product = Product;
exports.City = City;

exports.fillModelsWithDefaultData = () => {
  City.count((err, count) => {
    if (!err && count === 0) {
      const cities = new DefaultCitiesList();
      for (let city of cities) {
        const cityDocument = new City(city);
        cityDocument.save(err => console.log(err));
      }
    }
  });
  Product.count((err, count) => {
    if (!err && count === 0) {
      const products = new DefaultProductsList();
      for (let product of products) {
        const productDocument = new Product(product);
        productDocument.save();
      }
    }
  });
  User.count((err, count) => {
    if (!err && count === 0) {
      const users = new DefaultUsersList();
      for (let user of users) {
        const userDocument = new User(user);
        userDocument.save();
      }
    }
  });
};
