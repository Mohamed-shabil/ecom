const {kafka} = require('./kafkaClient');

const producer = kafka.producer();

exports.serviceToProducer = async (data, topic) => {
  try {
    if (!data) {
      console.log("errror");
    }
    await producer.connect();
    const message = {
      data: data,
    };

    const respose = await producer.send({
      topic: topic,
      messages: data.map(item => ({
        value:JSON.stringify(item)
      })),
    });

    console.log(respose)
    
  } catch (error) {
    console.error(`Error: ${error.message}`); 
  } finally {
    await producer.disconnect();
  }
};