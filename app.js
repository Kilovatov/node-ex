const express = require('express');
const {usersRouter, productsRouter, authRouter} = require('./routes');

const app = express();

app.use(express.json());

const products = [{
    id: 1,
    name: 'Cool stuff',
    reviews: ['Good one', 'I like it']
}];

app.use('/api/users', usersRouter(products));
app.use('/api/products', productsRouter(products));
app.use('/', authRouter);

exports.app = app;