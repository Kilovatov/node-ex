'use strict';

const config = require('./config/config');
const {User, Product} = require('./models');
const {DirWatcher} = require('./dirwatcher');
const {Importer} = require('./importer');

console.log(config.name);

const user = new User();
const model = new Product();
const dir = '/Users/sergei/study/node/ex/data';
const dirwatcher = new DirWatcher();
dirwatcher.watch(dir, 1000);
const importer = new Importer(dirwatcher, dir);
// setInterval(() => console.log(importer.data), 10000);
// console.log(importer.importSync(dir+'/MOCK_DATA.csv'));