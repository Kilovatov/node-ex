const {CitiesDB} = require('./../models');

require('http')
    .createServer()
    .on('request', (req, res) => {
        CitiesDB.find({}, (err) => {
            if (err) throw err;
        }).then(cities =>
        {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(cities[Math.floor(Math.random()*cities.length)]));
        }
        );
    })
    .listen(3000);
