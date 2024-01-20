import Order from '../model/order';
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