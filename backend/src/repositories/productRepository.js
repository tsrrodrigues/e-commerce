const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.getAll = async () => {
    try {
        const products = await Product.find({}, '_id name description quantity price createdAt');
        return { products };
    } catch (err) {
        return {
            error: "List All Products failed",
            value: err
        }
    }
}

exports.getOne = async (data) => {
    try {
        const product = await Product.findById(data.params.id, '_id name description price quantity createdAt');
        return { product };
    } catch (err) {
        return {
            error: "List One Products failed",
            value: err
        }
    }
}

exports.getAvailables = async () => {
    try {
        const products =
            (await Product.find({}, '_id name description quantity price createdAt'))
            .filter((product) => product.quantity > 0);
        return { products };
    } catch (err) {
        return {
            error: "List Availables Products failed",
            value: err
        }
    }
}

exports.register = async (data) => {
    const { name } = data.body;
    try {
        if (await Product.findOne({ name }))
            return { error: 'Product already exists'}

        let product = new Product();

        product.name = data.body.name;
        product.description = data.body.description;
        product.price = data.body.price;
        product.quantity = data.body.quantity;

        product = await product.save(); 

        return { product }
    } catch (err) {
        return {
            error: "Registration failed",
            value: err
        }
    }
}

exports.edit = async (data) => {
    const { name } = data.body;
    try {
        if (await Product.findOne({ name }))
            return { error: 'Name already registred'}
        
            const id = data.params.id;
        const product = await Product.findByIdAndUpdate(id, {
            $set: {
                name: data.body.name,
                description: data.body.description,
                price: data.body.price,
            }
        });

        return {
            id: product.id, 
            message: "Produto editado com sucesso"
        }
    } catch (err) {
        return {
            error: "Edit failed",
            value: err
        }
    }
}

exports.editQuantity = async (data) => {
    try {
        const id = data.params.id;
        const quantity = data.query.quantity;
        await Product.findByIdAndUpdate(id, {quantity: quantity});
        return { message: "Quantidade atualizada com sucesso" };
    } catch (err) {
        return {
            error: "Edit failed",
            value: err
        }
    }
}

exports.delete = async (data) => {
    try {
        const product = await Product.findByIdAndDelete(data.params.id);
        return { product }
    } catch (err) {
        return {
            error: "Delete failed",
            value: err
        }
    }
}