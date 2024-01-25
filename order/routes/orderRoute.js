const express = require('express');
const router = express.Router();
const {getOrder} = require('../controller/orderController');

router.get('/api/order/show',getOrder);

module.exports = router;