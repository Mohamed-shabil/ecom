const express = require('express');
const { addToCart, removeFromCart, getCart,createOrder } = require('../controller/cartController');

const router = express.Router();

router.post('/api/cart/add',addToCart);

router.patch('/api/cart/remove',removeFromCart);

router.get('/api/cart/show',getCart);

router.post('/api/cart/createOrder',createOrder);

module.exports = router;