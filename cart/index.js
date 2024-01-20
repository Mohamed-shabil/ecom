import express from 'express'
const app = express();
import bodyParser from 'body-parser';
import morgan from 'morgan'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import cartRouter from './routes/cartRoute';

dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Db Connected Successfully')
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(cookieParser());
app.use(morgan('dev'));


app.use(cartRouter);

const port = 3003;
app.listen(port ,()=>{
    console.log(`[CART SERVICE] Listening on Port ${port}`);
})
