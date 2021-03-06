const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const cors = require('cors')

// Carregando os models
const User = require('./models/user')
const Produtc = require('./models/product')
const Cart = require('./models/cart')
const Order = require('./models/order')
const Tag = require('./models/tag.js')
const Market = require('./models/market')

// Importando as rotas
const indexRoute = require('./routes/index')
const userRoute = require('./routes/user')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')
const tagRoute = require('./routes/tag')
const marketRoute = require('./routes/market')

app.use(cors())
app.use(express.static('static'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', indexRoute)
app.use('/user', userRoute)
app.use('/product', productRoute)
app.use('/cart', cartRoute)
app.use('/order', orderRoute)
app.use('/tag', tagRoute)
app.use('/market', marketRoute)

module.exports = app
