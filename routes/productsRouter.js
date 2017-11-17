const express = require('express');
const router = express.Router();
const {checkToken} = require('./../middlewares');
const db = require('./../models');

    router.param('productId', function (req, res, next, id) {
         db.Products.findById(id)
            .then(product => {
                req.product = product;
                next();
            })
             .catch(er => {
                 console.log('The error occurred: ' + er);
                 res.status(500).send({ error: "Internal Error" });
             });
    });
    // router.all('*', checkToken);

    router.get('/', function (req, res) {
        db.Products
            .findAll()
            .then((products) =>
                res.json(products)
            );
    });
    router.get('/:productId', function (req, res) {
        if (req.product) {
            res.json(req.product)
        }
        res.status(404).send({ error: "Not found" });
    });
    router.get('/:productId/reviews', function (req, res) {
        if (req.product) {
            res.json(req.product.reviews)
        }
        res.status(404).send({ error: "Not found" });

    });
    router.post('/', function (req, res) {
        const product = req.body;
        db.Products.create(product)
            .then(() => db.Products.findAll()
                .then((products) =>
                    res.json(products)
                ))
            .catch(er => {
                console.log('The error occurred: ' + er);
                res.status(500).send({ error: "Internal Error" });
            });
    });




module.exports = router;