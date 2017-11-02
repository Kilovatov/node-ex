const express = require('express');
const {parseQuery, parseCookie} = require('./middlewares');
const {usersRouter, productsRouter} = require('./routes');

const app = express();

app.use(express.json());
app.use(parseCookie);
app.use(parseQuery);

const products = [{
    id: 1,
    name: 'Cool stuff',
    reviews: ['Good one', 'I like it']
}];

app.use('/api/users', usersRouter(products));
app.use('/api/products', productsRouter(products));

exports.app = app;