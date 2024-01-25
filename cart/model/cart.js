const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId : String,
    productId : String,
    name : String,
    price : String,
    description: String,
    image: String
});

const Cart = mongoose.model('Cart',cartSchema);

module.exports = Cart;