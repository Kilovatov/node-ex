'use strict';

const config = require('./config/config');
const {User, Product} = require('./models');

console.log(config.name);

const user = new User();
const model = new Product();