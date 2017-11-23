const express = require('express');
const router = express.Router();
const {Product} = require('./../models');

router.param('productId', function (req, res, next, id) {
    Product.find({id: id})
        .then(product => {
            req.product = product[0];
            next();
        })
        .catch(er => {
            console.log('The error occurred: ' + er);
            res.status(500).send({error: "Internal Error"});
        });
});

router.get('/', function (req, res) {
    Product
        .find({})
        .then((products) =>
            res.json(products)
        );
});
router.get('/:productId', function (req, res) {
    if (req.product) {
        res.json(req.product)
    }
    res.status(404).send({error: "Not found"});
});
router.get('/:productId/reviews', function (req, res) {
    if (req.product) {
        res.json(req.product.reviews)
    }
    res.status(404).send({error: "Not found"});

});
router.delete('/:productId', function (req, res) {
    if (req.product) {
        Product.find(req.product).remove().exec();
        res.json(req.product)
    }
    res.status(404).send({error: "Not found"});
});
router.post('/', function (req, res) {
    const product = req.body;
    const productDocument = new Product(product);
    productDocument.save()
        .then(() => Product.find({})
            .then((products) =>
                res.json(products)
            ))
        .catch(er => {
            console.log('The error occurred: ' + er);
            res.status(500).send({error: "Internal Error"});
        });
});


module.exports = router;