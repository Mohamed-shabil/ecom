import express from 'express'
const app = express();
import bodyParser from 'body-parser';
import morgan from 'morgan'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import orderRoute from './routes/orderRoute'

dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Db Connected Successfully')
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(cookieParser());
app.use(morgan('dev'));


app.use(orderRoute);


const port = 3000;
app.listen(port ,()=>{
    console.log(`[ORDER SERVICE] Listening on Port ${port}`);
})
