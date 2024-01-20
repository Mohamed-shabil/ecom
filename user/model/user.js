const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
    },
    password:{
        type:String,        
    },
    address: [{
        address:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Address'
        }
    }],
})

const User = mongoose.model('User',userSchema);
module.exports = User; 