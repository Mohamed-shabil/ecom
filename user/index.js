const express = require("express");
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const userRoute = require('./routes/userRoute');

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Db Connected Successfully');
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use(userRoute);

const port = 3000;

app.listen(port, () => {
    console.log(`[USER SERVICE] Listening on Port ${port}`);
});
