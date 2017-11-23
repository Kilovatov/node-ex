const express = require('express');
const {usersRouter, productsRouter, authRouter, citiesRouter} = require('./routes');
const {fillModelsWithDefaultData} = require('./models');
fillModelsWithDefaultData();

const app = express();

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/cities', citiesRouter);
app.use('/', authRouter);

exports.app = app;