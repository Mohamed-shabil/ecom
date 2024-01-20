import express from 'express';
import { addToCart, removeCart, getCart } from '../controller/cartController'

const router = express.Router();

router.post('/api/cart/add',addToCart);

router.patch('/api/cart/remove',removeCart);

router.get('/api/cart/show',getCart);

router.get('/api/users/address/',)
router.post('/api/users/address/add',AddAddress)

router.patch('/api/users/address/edit',editAddress)



module.exports = router;