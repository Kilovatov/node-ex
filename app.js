const express = require('express');
const {usersRouter, productsRouter, authRouter} = require('./routes');

const app = express();

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/', authRouter);

exports.app = app;