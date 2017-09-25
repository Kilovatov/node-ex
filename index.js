'use strict';

const config = require('./config/config');
const {User, Product} = require('./models');
const {DirWatcher} = require('./dirwatcher');
const {Importer} = require('./importer');

console.log(config.name);

const user = new User();
const model = new Product();
const dir = __dirname + '/data';
const dirwatcher = new DirWatcher();
dirwatcher.watch(dir, 100);
const importer = new Importer(dirwatcher);
//setInterval(() => console.log(importer.data), 1000);
// console.log(importer.importSync(dir+'/MOCK_DATA.csv'));