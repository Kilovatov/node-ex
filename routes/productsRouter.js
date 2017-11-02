const express = require('express');
const router = express.Router();

const productsRouter = (products) => {
    router.param('productId', function (req, res, next, id) {
        req.product = products.filter(product => product.id == id)[0];
        next();
    });

    router.get('/', function (req, res) {
        console.log('COOKIES: ' + JSON.stringify(req.parsedCookies));
        console.log('QUERY PARAMS: ' + JSON.stringify(req.parsedQuery));
        res.json(products);
    });
    router.get('/:productId', function (req, res) {
        res.json(req.product);
    });
    router.get('/:productId/reviews', function (req, res) {
        res.json(req.product.reviews)
    });
    router.post('/', function (req, res) {
        const product = req.body;
        products.push(product);
        res.json(product);
    });
    return router;
};

module.exports = productsRouter;