const express = require('express');
const { getProducts, createProduct, updateProduct} = require('../controller/productController')
const { productImages, resizeProductImages} = require('../uploadMiddleware')
const { authChecker, requireAuth} = require('../auth')
const {} = require('../uploadMiddleware')
const router = express.Router();

router.use(authChecker);

router.get('/api/products/show',getProducts);

router.post('/api/products/new',productImages,resizeProductImages,createProduct);
router.patch('/api/products/update',productImages,resizeProductImages,updateProduct);


module.exports = router;