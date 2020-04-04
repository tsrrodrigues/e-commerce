const mongoose = require('mongoose');

//Conexão ao banco
mongoose.connect('mongodb://localhost/ecommerce',
    {   
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
mongoose.Promise = global.Promise;

module.exports = mongoose;