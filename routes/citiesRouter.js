const express = require('express');
const router = express.Router();
const {CitiesDB} = require('./../models');

router.param('cityId', function (req, res, next, id) {
    CitiesDB.find({id: id})
        .then(city => {
            req.city = city[0];
            next();
        })
        .catch(er => {
            console.log('The error occurred: ' + er);
            res.status(500).send({error: "Internal Error"});
        });
});
// router.all('*', checkToken);

router.get('/', function (req, res) {
    CitiesDB
        .find({})
        .then((cities) =>
            res.json(cities)
        );
});
router.get('/:cityId', function (req, res) {
    if (req.city) {
        console.log(req.city);
        res.json(req.city)
    }
    res.status(404).send({error: "Not found"});
});
router.delete('/:cityId', function (req, res) {
    if (req.city) {
        CitiesDB.find(req.city).remove().exec();
        res.json(req.city)
    }
    res.status(404).send({error: "Not found"});
});

router.put('/', function (req, res) {
    const city = req.body;
    CitiesDB.find({id: city.id})
        .then(cities => {
            if (cities.length === 0) {
                const cityDocument = new CitiesDB(city);
                cityDocument.save()
            } else {
                cities[0].set(city)
                    .save()
            }
        })
        .then(() =>
            res.json(city)
        )
        .catch(er => {
            console.log('The error occurred: ' + er);
            res.status(500).send({error: "Internal Error"});
        });
});
router.post('/', function (req, res) {
    const city = req.body;
    const cityDocument = new CitiesDB(city);
    cityDocument.save()
        .then(() =>
                res.json(city)
        )
        .catch(er => {
            console.log('The error occurred: ' + er);
            res.status(500).send({error: "Internal Error"});
        });
});


module.exports = router;