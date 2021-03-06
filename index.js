// const config = require('./config/config');
// const {User, Product} = require('./model');
// const {DirWatcher} = require('./dirwatcher');
// const {Importer} = require('./importer');
// const {StreamModule} = require('./utils/streamsModule');

// console.log(config.name);
//
// const user = new User();
// const model = new Product();
// const dir = __dirname + '/data';
// const dirwatcher = new DirWatcher();
// dirwatcher.watch(dir, 100);
// const importer = new Importer(dirwatcher);
//setInterval(() => console.log(importer.data), 1000);
// console.log(importer.importSync(dir+'/MOCK_DATA.csv'));

// const streamModule = new StreamModule();
// streamModule.run({
//     action: 'bundle-css',
//     path: __dirname + '/styles'
// });

const {app} = require('./app');
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App listening on port ${port}!`));