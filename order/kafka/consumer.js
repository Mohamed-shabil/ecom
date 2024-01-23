const {kafka} = require('./kafkaClient');
const consumer= kafka.consumer({groupId:"cart-service-group"})
const Order = require('../model/order');
const { v4: uuidv4 } = require('uuid');


console.log(req.currentUser)
const serviceToConsumer = async(topic)=>{
    try {
        await consumer.connect()
        await consumer.subscribe({topic:topic,fromBeginning:true})
        await consumer.run({
            eachMessage:async({message})=>{
              const productData = JSON.parse(message.value.toString());

              const productId = productData._id;

              let order = await Order.findOne({});

              if (!order) {
                order = new Order({
                  userId: 'userId', 
                  orderId: uuidv4(),
                  products: [], 
                });
              }

              order.products.push(productId);
              await order.save();

              console.log(order)
            }
        })
    } catch (error) {
      console.log('Error in consumer in user service',error);
    }

}

module.exports = serviceToConsumer;