const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan')
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const serviceToConsumer = require('./kafka/consumer')
const orderRoute = require('./routes/orderRoute')
const {authChecker} = require('./auth')
const {deleteAll} = require('./controller/orderController');
const cors = require('cors');

dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Db Connected Successfully')
})



serviceToConsumer('creating-order');

app.use(cors({
    origin:'http://localhost:3000',
    methods:['POST','GET','DELETE'],
    credentials: true,
}))

app.options('*', cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use(authChecker)

app.use(orderRoute);
// deleteAll();

const port = 3004;

app.listen(port ,()=>{
    console.log(`[ORDER SERVICE] Listening on Port ${port}`);
})
