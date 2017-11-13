const express = require('express');
const router = express.Router();
const {checkToken} = require('./../middlewares');
const db = require('./../models');

const isIdUnique =  (id) =>
    db.Products.count({ where: { id: id } })
        .then(count => count === 0);

    router.param('productId', function (req, res, next, id) {
         db.Products.findById(id)
            .then(product => {
                req.product = product;
                next();
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
        res.json(req.product);
    });
    router.get('/:productId/reviews', function (req, res) {
        res.json(req.product.reviews)
    });
    router.post('/', function (req, res) {
        const product = req.body;
        isIdUnique(product.id).then(unique => unique ? db.Products.create(product) : true)
            .then(() => db.Products.findAll()
                .then((products) =>
                    res.json(products)
                ));
    });




module.exports = router;