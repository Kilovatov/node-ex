const fs = require('fs');
const replace = require('stream-replace');
const message = 'Hello World';

require('http')
    .createServer()
    .on('request', (req,res) => {
        fs.createReadStream('index.html').pipe(replace('{message}', message)).pipe(res);
    })
    .listen(3000);