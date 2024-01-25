const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    userId : String,
    name : String,
    address : String,
    city : String,
    pin: String,
    locality:String,
    phone: String
});

const Address = mongoose.model('Address',addressSchema);

module.exports = Address;
