'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema ({
    name: {
        type: String,
        required: [true, "O nome é obrigatório"],
        trim: true,
        unique: true
    },
    description: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "O preco é obrigatório"],
    },
    quantity: {
        type: Number,
        required: [true, "A quantidade do produto no estoque é obrigatória"]
    }
}, {timestamps: true});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;