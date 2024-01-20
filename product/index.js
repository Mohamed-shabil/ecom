const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const productRoute = require('./routes/productRoute')
dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Db Connected Successfully')
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(cookieParser());
app.use(morgan('dev'));


app.use(productRoute);


const port = 3001;
app.listen(port ,()=>{
    console.log(`[PRODUCT SERVICE] Listening on Port ${port}`);
})
