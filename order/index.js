const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan')
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const serviceToConsumer = require('./kafka/consumer')
// const orderRoute = require('./routes/orderRoute')

dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Db Connected Successfully')
})

serviceToConsumer('creating-order');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(cookieParser());
app.use(morgan('dev'));


// app.use(orderRoute);


const port = 3003;

app.listen(port ,()=>{
    console.log(`[ORDER SERVICE] Listening on Port ${port}`);
})
