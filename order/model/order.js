const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderId :{
        type:String,
        unique:true,
    },
    userId: {
        type:String
    },
    products: [],
    status: {
        type: String,
        enum: ['Pending', 'Processing','Shipped', 'Delivered', 'Cancel','Return'],
        default: 'Pending',
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    totalPrice: {
        type: Number,
    },
},);


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;