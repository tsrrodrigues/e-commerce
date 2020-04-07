const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.getAll = async (data) => {
    try {
        // TAG
        let params = {};
        if (data.query.tag != undefined)
            params = {tags: data.query.tag};
        //SORT
        let sort = "";
        if (data.query.sort != undefined)
            sort = data.query.sort;

        const products =
            await Product.find(params, '_id name description quantity price createdAt tags')
            .sort(sort);
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
        const product = await Product.findById(data.params.id, '_id name description quantity price createdAt tags');
        return { product };
    } catch (err) {
        return {
            error: "List One Products failed",
            value: err
        }
    }
}

exports.getAvailables = async (data) => {
    try {

        // TAG
        let params = {};
        if (data.query.tag != undefined)
            params = {tags: data.query.tag};
        //SORT
        let sort = "";
        if (data.query.sort != undefined)
            sort = data.query.sort;

        const products =
            (await Product.find(params, '_id name description quantity price createdAt tags')
            .sort(sort))
            .filter((product) => product.quantity > 0)
        return products;
    } catch (err) {
        return {
            error: "List Availables Products failed",
            value: err
        }
    }
}

exports.getByTag = async (data) => {
    try {
        const products = 
        (await Product.find({tags: data.body.tags}, '_id name description quantity price createdAt tags'));
    } catch (err) {
        return {
            error: "List Products By tag failed",
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
        product.tags = data.body.tags;

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
        const id = data.params.id;
        const product = await Product.findByIdAndUpdate(id, {
            $set: {
                name: data.body.name,
                description: data.body.description,
                price: data.body.price,
                tags: data.body.tags
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