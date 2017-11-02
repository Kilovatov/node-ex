const express = require('express');
const router = express.Router();

const usersRouter = (products) => {
    router.get('/', function(req, res){
    res.json(products);
});
    return router;
};

module.exports = usersRouter;