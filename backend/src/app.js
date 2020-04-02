const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

// Importando as rotas
const indexRoute = require('./routes/index');
const produtcRoute = require('./routes/product');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', produtcRoute);

module.exports = app;