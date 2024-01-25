const User = require('../model/user')
const bcrypt = require('bcryptjs')
const {Address} = require('../model/address')
const catchAsync = require('../util/catchAsync')
const jwt = require('jsonwebtoken');
const {serviceToProducer} = require('../kafka/producer')

exports.signin = catchAsync( async (req,res)=>{
    const {password, email} = req.body;
    console.log(password,email)
    const currentUser = await User.findOne({email})
    
    if(!currentUser){
        return res.status(400).json({
            error:'invalid password or email'
        })
    }else{
        const isMatch = await bcrypt.compare(password,currentUser.password);

        if(!isMatch){
            return res.status(400).json({
                error:'invalid password or email'
            })
        }


        currentUser.password = undefined;
        console.log('[currentUser]',currentUser);


        const payload = {
            _id:currentUser._id,
            name:currentUser.name,
            phone:currentUser.phone,
            email:currentUser.email
        }

        const token = jwt.sign(payload,process.env.JWT_KEY)

        serviceToProducer(payload,'user-created')
        

        const cookieOptions = {
            expires: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
            ),
            domain:'localhost',
            withCredentials: true
        };
        req.session = {
            jwt:token
        };

        res.cookie('jwt',token,cookieOptions);

        res.status(200).json({
            message:"user Loginned",
            user:currentUser,
        })
    }
})


exports.signup = catchAsync( async (req,res)=>{
    const oldUser = await User.findOne({email:req.body.email});
   
    if(oldUser){
        return res.status(400).json({
            error :"User already exists, please login"
        })
    }
    if(req.body.password !== req.body.ConfirmPassword){
        return res.status(400).json({
            error :"Your Passwords are not matching, please try again"
        })
    }
    const pass = await bcrypt.hash(req.body.password,10);

    
    const user = new User({
        name : req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password : pass,
    })

    await user.save();
    
    const payload = {
        _id:user._id,
        name:user.name,
        phone:user.phone,
        email:user.email
    }

    const token = jwt.sign(payload,process.env.JWT_KEY)

    console.log('[token]',token);

    const cookieOptions = {
        expires: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        ),
        withCredentials: true
      };
    req.currentUser = payload
    req.session.jwt = token
    res.cookie('jwt',token,cookieOptions);

    res.status(200).json({
        message :"you are signed up successfully",
        user,
        token
    })
})

exports.logout = catchAsync(async (req, res, next )=>{
    res.clearCookie('jwt');
    return res.status(200).json({
        message:null
    })
})


exports.AddAddress = catchAsync( async (req,res)=>{
    const address = await Address.create({
        userId: req.user._id,
        name:req.body.name,
        pincode: req.body.pincode,
        city:req.body.city,
        locality:req.body.locality,
        phone:req.body.phone,
        alternativePhoneNumber:req.body.altNo,
        landMark:req.body.landMark
    })
    const user = await User.findById({_id:address.userId})
    user.address.push(address._id);
    user.save();
    return res.status(200).json({
        message: 'Address added successfully',
        address,
    })
})

exports.editAddress = catchAsync( async (req,res)=>{
    const updatedAddress = {
        name:req.body.name,
        pincode:req.body.pincode,
        city:req.body.city,
        locality:req.body.locality,
        alternativePhoneNumber:req.body.altNo,
        landMark : req.body.landMark
    }
    const address = await Address.updateOne({_id:req.params.id},updatedAddress);

    return res.status(200).json({
        message: 'Address updated successfully',
        address,
    })
})

exports.currentUser = catchAsync(async (req,res)=>{
    console.log(req.currentUser)
    if(!req.currentUser){
        return res.status(401).json({
            error:'you are not authenticated'
        })
    }
    return res.status(200).json({
        data:req.currentUser
    })
})