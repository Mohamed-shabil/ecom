const Cart = require('../model/cart');
const catchAsync = require('../util/catchAsync');
const {serviceToProducer} = require('../kafka/producer');
const Address = require('../model/address');

const { v4:uuid} = require('uuid')

exports.addToCart = catchAsync(async (req, res) => {
    const {product} = req.body;

    const userId = req.currentUser._id
    const cart = await Cart.find({userId:userId,productId:product._id});
    
    if (cart.length !== 0) {
        return res.status(400).json({
            error:"product already exist in cart",
            cart
        })
    } 
    
    const newItemToCart = new Cart({
        userId,
        productId:product._id,
        name:product.name,
        price: product.price,
        description : product.description,
        image : product.image
    }) 
    
    await newItemToCart.save();
    const newCart = await Cart.find({userId});
    return res.status(201).json({
        message:"product added to cart",
        cart : newCart
    })
});


exports.removeFromCart = catchAsync(async (req,res)=>{
    const { productId } = req.body;
    const userId = req.currentUser._id;
    const cart = await Cart.deleteOne({ userId, productId });
    if (!cart) {
        return res.status(400).json({
            message: 'Item not found in the cart',
        });
    }
    console.log('CART : =',cart)
    const newCart = await Cart.find({userId});
    const total = newCart.reduce((acc,item)=>{
        return acc*1 + item.price*1
    },0);
    return res.status(200).json({
        message: 'Item removed from the cart',
        cart:newCart,
        totalCartValue:total
    });
})

exports.getCart = catchAsync(async (req,res)=>{
    const {userId,productId} = req.body;
    const cart = await Cart.find(userId)
    const total = cart.reduce((acc,item)=>{
        return acc*1 + item.price*1
    },0);

    if(cart.length == 0){
        return res.status(200).json({
            message:' your cart is Empty',
            cart,
        })
    }
    return res.status(200).json({
        message:'cart',
        cart,
        totalCartValue: total
    })
})


exports.createOrder = catchAsync(async(req,res)=>{
    const userId = req.currentUser._id;
    const cart = await Cart.find({userId});
    const address = await Address.findOne({userId});
    
    if(!address){
        return res.status(404).json({
            error : 'Address is not found',
        })
    }


    const orderId = uuid();
    const updatedCart = cart.map(item => {
        return{
            name: item.name,
            productId: item.productId,
            userId: item.userId,
            image: item.image,
            price: item.price,
            description: item.description,
            orderId: orderId
        }
    });
    console.log("UPDATEDCART ---",updatedCart);
    
    serviceToProducer(updatedCart,'creating-order');
    
    await Cart.deleteMany({userId});

    res.status(200).json({
        message:'success'
    })
})

exports.addAddress = catchAsync(async (req,res)=>{
    console.log(req.body)
    const {name, address, city, locality, pin, phone} = req.body;
    const userId = req.currentUser._id;

    const newAddress = new Address({
        userId,
        name,
        address,
        city,
        locality,
        pin,
        phone
    });
    await newAddress.save();
    
    return res.status(200).json({
        message:"Address Added",
        address: newAddress
    });
})


exports.deleteAll = async () =>{
    const deleted = await Cart.deleteMany();
    console.log("DONE",deleted)
}