const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const productRoute = require('./routes/productRoute')
const cors = require('cors');
const { requireAuth,authChecker } = require('./auth');
dotenv.config()


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Db Connected Successfully')
})

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
app.use(express.static('upload'));
app.use(authChecker);
app.use((req,res,next)=>{
    console.log(req.currentUser);
    next();
})


app.use(productRoute);



const port = 3002;
app.listen(port ,()=>{
    console.log(`[PRODUCT SERVICE] Listening on Port ${port}`);
})
