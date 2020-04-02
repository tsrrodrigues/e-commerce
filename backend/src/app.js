const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Carregando os models
const User = require('./models/user');

// Importando as rotas
const indexRoute = require('./routes/index');
const userRoute = require('./routes/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/user', userRoute);

module.exports = app;