const express = require('express');
const {parseQuery} = require('./middlewares/queryParsingMiddleware');
const {parseCookie} = require('./middlewares/cookieParsingMiddleware');

const app = express();
const router = express.Router();

app.use(express.json());
app.use(parseCookie);
app.use(parseQuery);

const products = [{
    id: 1,
    name: 'Cool stuff',
    reviews: ['Good one', 'I like it']
}];

router.param('id', function(req, res, next, id) {
    req.product = products.filter(product => product.id == id)[0];
    next();
});

router.get('/api/products', function(req, res){
    console.log('COOKIES: ' + JSON.stringify(req.parsedCookies));
    console.log('QUERY PARAMS: ' + JSON.stringify(req.parsedQuery));
    res.json(products);
});
router.get('/api/products/:id', function(req, res){
    res.json(req.product);
});
router.get('/api/products/:id/reviews', function(req, res){
    res.json(req.product.reviews)
});
router.post('/api/products', function(req, res){
    const product = req.body;
    products.push(product);
    res.json(product);
});
router.get('/api/users', function(req, res){
    res.json(products);
});

app.use('/', router);

exports.app = app;