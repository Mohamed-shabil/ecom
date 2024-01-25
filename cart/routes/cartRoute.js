const express = require('express');
const { addToCart, removeFromCart, getCart,createOrder,addAddress } = require('../controller/cartController');
const {requireAuth} = require('../auth');

const router = express.Router();

router.use(requireAuth);

router.post('/api/cart/add',addToCart);

router.post('/api/cart/remove',removeFromCart);

router.get('/api/cart/show',getCart);

router.post('/api/cart/createOrder',createOrder);

router.post('/api/address/new',addAddress);

module.exports = router;