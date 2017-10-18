const parseArgs = require('minimist');
const repl = require('repl');
const path = require('path');
const fs = require('fs');
const {promisify} = require('util');
const through = require('through2');
const split = require('split');
const readdirAsync = promisify(fs.readdir);
const request = require('request');

const externalStyles = 'https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css';

const parseCSV = () => {
    let templateKeys = [];
    let parseHeadline = true;
    return through.obj((data, enc, cb) => {
        if (parseHeadline) {
            templateKeys = data.toString().split(',');
            parseHeadline = false;
            return cb(null, null);
        }
        const entries = data.toString().split(/,(?!\s)/);
        const obj = {};
        templateKeys.forEach((el, index) => {
            obj[el] = entries[index];
        });
        return cb(null, obj);
    });
};

const toJSON = () => {
    let objs = [];
    return through.obj(function(data, enc, cb) {
        objs.push(data);
        cb(null, null);
    }, function(cb) {
        this.push(JSON.stringify(objs));
        cb();
    });
};

function inputOutput(path) {
    const reader = fs.createReadStream(path);
    reader.pipe(process.stdout);
}
function toUpperCase() {
    process.stdin
        .pipe(through(function(chunk, enc, callback)  {
            this.push(chunk.toString().toUpperCase());
            callback();
        }))
        .pipe(process.stdout);
}

function transformFormSvcToJson(path) {
    fs.createReadStream(path)
        .pipe(split())
        .pipe(parseCSV())
        .pipe(toJSON())
        .pipe(process.stdout);
}

function transformFormSvcToJsonFile(path) {
    const output = path.replace('.csv', '.json');
    fs.createReadStream(path)
        .pipe(split())
        .pipe(parseCSV())
        .pipe(toJSON())
        .pipe(fs.createWriteStream(output));
}

function bundleCssFiles(pathDir) {
    const output = pathDir + '/bundle.css';
    fs.unlink(output, (err) => {
        if (err && err.code !== 'ENOENT') {
            console.log(err)
        }
    });
    readdirAsync(pathDir)
        .then(list => list.filter(item => path.extname(item) === '.css'))
        .then(files => files.map(file =>
                fs.createReadStream(pathDir + '/' + file)
                    .pipe(through(function(chunk, enc, callback)  {
                        this.push(chunk.toString() + '\n');
                        callback();
                    }))
                    .pipe(fs.createWriteStream(output, {'flags': 'a'}))
            )
        )
        .then(() => request(externalStyles)
            .pipe(fs.createWriteStream(output, {'flags': 'a'})))
}



function printHelpMessage() {
    console.log('use with --action=actionName [--file=pathToFile --path=pathToDirectory]' +
        '\n actionName can be one of [io, uc, transform, transform-file, bundle-css]');
}
function printHowToUse() {
    console.log('invalid command');
    printHelpMessage();
}

const runStream = function(...rest) {
    let actionName;
    let filePath;
    let dirPath;

    if (rest[0]) {
        actionName = rest[0].action;
        filePath = rest[0].file ? rest[0].file : null;
        dirPath = rest[0].path ? rest[0].path : null;

    } else if (process.argv[2] === '--help' || process.argv[2] === '-h') {
        return printHelpMessage();
    } else {
        let {action, file, help, path} = parseArgs(process.argv, {
            alias: {
                a: 'action',
                h: 'help',
                f: 'file',
                p: 'path'
            }
        });
        if (!action) {
            return printHowToUse();
        }
        if (help) {
            printHelpMessage();
        }
        actionName = action;
        filePath = file;
        dirPath = path;
    }

    switch (actionName) {
        case 'io':
            if (!filePath) {
                printHowToUse();
            }
            inputOutput(filePath);
            break;
        case 'uc':
            toUpperCase();
            break;
        case 'transform':
            if (!filePath) {
                printHowToUse();
            }
            transformFormSvcToJson(filePath);
            break;
        case 'transform-file':
            if (!filePath) {
                printHowToUse();
            }
            transformFormSvcToJsonFile(filePath);
            break;
        case 'bundle-css':
            if (!dirPath) {
                printHowToUse();
            }
            bundleCssFiles(dirPath);
            break;
        default:
            printHowToUse();
    }
};

exports.runStream = runStream;