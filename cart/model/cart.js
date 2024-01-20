import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    userId:String,
    product: String,
});

const Cart = mongoose.model('Cart',cartSchema);

module.exports = Cart;