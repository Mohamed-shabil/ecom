const express = require('express');

const {signin,signup,logout,AddAddress,editAddress,currentUser} = require('../controller/userController')

const {authChecker,requireAuth} = require('../auth');

const router = express.Router();

router.use(authChecker);

router.post('/api/users/signup',signup)

router.post('/api/users/signin',signin)

router.post('/api/users/logout',logout)

router.get('/api/users/currentUser',currentUser);



router.post('/api/users/address/add',AddAddress)

router.patch('/api/users/address/edit',editAddress)

module.exports = router;