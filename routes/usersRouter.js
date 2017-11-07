const express = require('express');
const router = express.Router();
const {checkToken} = require('./../middlewares');

const usersRouter = (products) => {
    router.all('*', checkToken);
    router.get('/', function (req, res) {
        res.json(products);
    });
    return router;
};

module.exports = usersRouter;