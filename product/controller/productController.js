const Product = require('../model/product')
const catchAsync = require('../util/catchAsync')

exports.getProducts = catchAsync(async(req,res)=>{
    const products = await Product.find();
    return res.status(200).json({
        message:'success',
        products
    })
})


exports.createProduct = catchAsync(async(req,res)=>{
    const {name, image, price, description} = req.body;
    const productExist = await Product.findOne({name:name.toLowerCase()});

    if(!productExist){
        return res.status(400).json({
            error:'product with this name already exist'
        })
    }

    const product = await Product.create({
        name,
        image,
        description,
        price
    });
    
    return res.status(201).json({
        message:"product created Successfully",
        product
    })

})


exports.updateProduct =  catchAsync(async(req,res)=>{
    const {productId} = req.body;
    const product = await Product.findOne({_id:productId});

    if(!product){
        return res.status(400).json({
            error:'no product is exist with this product_id'
        })
    }

    const newProduct = await Product.findOneAndUpdate({_id:productId},req.body,{new:true});
    
    return res.status(201).json({
        message:"product updated",
        product:newProduct
    })
})


exports.updateProduct =  catchAsync(async(req,res)=>{
    const {productId} = req.body;
    const product = await Product.findOneAndDelete({_id:productId});
    
    return res.status(201).json({
        message:"product deleted successfully",
        product
    })
})
