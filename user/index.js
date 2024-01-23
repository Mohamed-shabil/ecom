const express = require("express");
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cookieSession = require('cookie-session');
const userRoute = require('./routes/userRoute');
const cors = require('cors');
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Db Connected Successfully');
}).catch((err)=>{
    console.log(err)
});

const app = express();

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());



app.use(morgan('dev'));

app.use(userRoute);



const port = 3001;

app.listen(port, () => {
    console.log(`[USER SERVICE] Listening on Port ${port}`);
});
