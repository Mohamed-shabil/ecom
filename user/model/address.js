const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name:{
        type:String,
        required:true
    },
    pincode: {
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    locality:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    alternativePhoneNumber:{
        type:Number,
    },
    defaultAddress:{
        type:Boolean,
        deafult:false
    },
    landMark:{
        type:String
    }
},{timestamps:true});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;