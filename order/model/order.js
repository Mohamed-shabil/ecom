import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    orderId :{
        type:String,
        unique:true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
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
        required:true
    },
    deliveryAddress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Address',
        required:true
    },
},);


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;