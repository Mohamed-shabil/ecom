const mongoose = require('mongoose'); 
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    slug: String,
    image:String,
},{ timestamps: true })


productSchema.pre('save',function(next){
    this.slug = slugify(this.name,{lower:true});
    next();
})


const Product = mongoose.model('Product',productSchema);
module.exports = Product; 