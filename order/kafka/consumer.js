const {kafka} = require('./kafkaClient');
const consumer= kafka.consumer({groupId:"cart-service-group"})
const Order = require('../model/order');

const serviceToConsumer = async(topic)=>{
    try {
        await consumer.connect()
        await consumer.subscribe({topic:topic,fromBeginning:true})
        await consumer.run({
            eachMessage:async({message})=>{
              const productData = JSON.parse(message.value.toString());

              const productId = productData._id;

              console.log(productData.orderId);
              let order = await Order.findOne({orderId:productData.orderId});
              console.log(order);

              if (!order) {
                order = new Order({
                  userId: productData.userId, 
                  orderId: productData.orderId,
                  products: [], 
                  totalPrice : 0
                });
              }
              
              order.products.push({
                name:productData.name,
                description:productData.description,
                price:productData.price,
                image:productData.image,
                productId:productData.productId
              });
              order.totalPrice += productData.price*1

              await order.save();
      
              console.log(productData);
            }
        })
    } catch (error) {
      console.log('Error in consumer in user service',error);
    }

}

module.exports = serviceToConsumer;