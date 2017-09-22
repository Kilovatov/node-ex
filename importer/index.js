'use strict';

const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const csvjson = require('csvjson');
const readdirAsync = promisify(fs.readdir);
const readFileAsync = promisify(fs.readFile);


class Importer {
    constructor(dirwatcher, dir) {
        dirwatcher.on('dirwatcher:changed', () => this.startImport(dir));
    }

    startImport(dirPath) {
        const files = [];
        const self = this;
        let data = [];
        return readdirAsync(dirPath).then((list) => {
            for (let item of list) {
                if (path.extname(item) === '.csv') {
                    files.push(item);
                }
            }
            return files;
        }).then(files => Promise.all(files.map(file =>
            self.import(dirPath + '/' + file)
                .then(jsonData => {
                    data = data.concat(jsonData);
                })
        )))
            .then(() => {
                this.data = data;
            })
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