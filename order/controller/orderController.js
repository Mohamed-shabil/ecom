const Order = require('../model/order');
const catchAsync = require('../util/catchAsync')


exports.cancelOrder = catchAsync(async (req,res)=>{
    const { userId, orderId } = req.body;
    const order = await Order.findOne({user:userId,orderId});

    if(!order){
        return res.status(400).json({
            error:'no order with this order Id',
        })
    }

    order.status = 'Return';

    await order.save();

    return res.status(200).json({
        message:'Order cancelled Successfully',
        order
    })
})


exports.getOrder = catchAsync(async (req,res)=>{
    console.log(req.currentUser)
    const orders = await Order.find();

    if(!orders.length){
        return res.status(400).json({
            error:"You dont have any orders"
        })
    }
    
    return res.status(200).json({
        orders,
    })
})

exports.deleteAll = async ()=>{
    const order = await Order.deleteMany();
    console.log("DONE");
}