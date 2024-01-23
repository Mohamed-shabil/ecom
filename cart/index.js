const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors');
const { authChecker } = require('./auth');
const cartRouter = require('./routes/cartRoute');
const serviceToConsumer = require('./kafka/consumer')
dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Db Connected Successfully')
})

serviceToConsumer('user-created');


app.use(cors({
    origin:'http://localhost:3000',
    methods:['POST','GET','DELETE'],
    credentials: true,
}))

// Handle preflight requests
app.options('*', cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use(authChecker)

app.use((req,res,next)=>{
    console.log("Current User = ",req.currentUser);
    next();
})

app.use(cartRouter);

const port = 3003;
app.listen(port ,()=>{
    console.log(`[CART SERVICE] Listening on Port ${port}`);
})
