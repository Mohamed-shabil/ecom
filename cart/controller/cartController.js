import Cart from '../model/cart';
import catchAsync from '../util/catchAsync'

exports.addToCart = catchAsync(async (req, res) => {
    const {userId, productId} = req.body
    const quantity = parseInt(req.body.quantity) || 1;
    const cart = await Cart.find({userId:userId,product:productId});
   
    const existingCartItemIndex = cart.findIndex(item => item.product.equals(product._id));

    if (existingCartItemIndex !== -1) {
        cart[existingCartItemIndex].quantity += quantity
    } else {
        cart.push({ product: productId, userId:userId});
    }
    
    await user.save();
    return res.status(201).json({
        message:"product added to cart",
        cart
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
    const cart = await Cart.find({userId:userId,product:productId})

    if(cart.length == 0){
        return res.status(200).json({
            message:' your cart is Empty'
        })
    }
    return res.status(200).json({
        message:'cart',
        cart
    })
})