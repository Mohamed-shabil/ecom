const Cart = require('../model/cart');
const catchAsync = require('../util/catchAsync');
const {serviceToProducer} = require('../kafka/producer')
const { v4:uuid} = require('uuid')

exports.addToCart = catchAsync(async (req, res) => {
    const {productId} = req.body
    console.log(req.currentUser)
    const userId = req.currentUser._id
    const cart = await Cart.find({userId:userId,product:productId});
    console.log(cart);
    if (cart) {
        return res.status(201).json({
            error:"product already exist in cart",
            cart
        })
    } 
    
    newItemToCart = new Cart({
        userId,
        product:productId
    }) 
    
    await newItemToCart.save();
    const newCart = await Cart.find({userId:userId,product:productId});
    return res.status(201).json({
        message:"product added to cart",
        newCart
    })
});


exports.removeFromCart = catchAsync(async (req,res)=>{
    const {userId, productId} = req.body
    const cart = await Cart.findById({userId:userId});
    const cartItemIndex = Cart.findIndex(item => item._id.equals(productId));
    
    if (cartItemIndex !== -1) {
      cart.splice(cartItemIndex, 1);
      await cart.save();
    }
    req.flash('error','item Removed from Cart');
    return req.status(200).json({
        message:'item revomed from cart',
        cart
    })
})

exports.getCart = catchAsync(async (req,res)=>{
    const {userId,productId} = req.body;
    const cart = await Cart.find(userId)
    if(cart.length == 0){
        return res.status(200).json({
            message:' your cart is Empty',
            cart
        })
    }
    console.log(cart)
    return res.status(200).json({
        message:'cart',
        cart
    })
})


exports.createOrder = catchAsync(async(req,res)=>{
    const { userId } = req.body;
    const cart = await Cart.find({userId});

    const orderId = uuid();
    console.log('ORDER ID :=',orderId)
    const updatedCart = cart.map(item => {
        item.orderId = orderId
        return item;
    });
    console.log(updatedCart)

    // serviceToProducer(updatedCart,'creating-order');
    res.status(200).json({
        message:'success'
    })
})