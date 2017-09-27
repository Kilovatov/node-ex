const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const csvjson = require('csvjson');
const readdirAsync = promisify(fs.readdir);
const readFileAsync = promisify(fs.readFile);


class Importer {
    constructor(dirwatcher) {
        dirwatcher.on('dirwatcher:changed', (dir) => this.startImport(dir));
    }

    startImport(dirPath) {
        return readdirAsync(dirPath)
            .then(list => list.filter(item => path.extname(item) === '.csv'))
            .then(files => Promise.all(files.map(file =>
                this.import(dirPath + '/' + file)))
                .then(jsonData => this.data = [...jsonData]
                    .map(data => JSON.parse(data))
                    .reduce((a,b) => a.concat(b))
                )
            )
            .catch((error) => {
                console.error('data hasn\'t been updated: ' + error);
            });
    }

    import(filePath) {
        return readFileAsync(filePath, {encoding: 'utf8'})
            .then(data => JSON.stringify(csvjson.toObject(data, {delimiter: /,(?!\s)/})))
            .catch(error => {
                console.log(error);
                throw error;
            });
    }

    importSync(filePath) {
        const data = fs.readFileSync(filePath, {encoding: 'utf8'});
        return JSON.stringify(csvjson.toObject(data, {delimiter: /,(?!\s)/}));
    }
}

exports.Importer = Importer;