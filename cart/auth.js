const jwt = require('jsonwebtoken');
const catchAsync = require('./util/catchAsync');
const { promisify} = require('util');

exports.authChecker = catchAsync(async(req,res,next)=>{
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
  
    if(!token){
      console.log('TOKEN NOT FOUND');
      return next();
    }
    
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_KEY);
    if(!decoded._id){
      return next();
    }
    req.currentUser = decoded;
    return next();
  })


exports.requireAuth = (req,res,next)=>{
    try {
      if(!req.currentUser){
        return res.status(401).json({
            error:"your not authenticated"
        })
    }
    next();
    } catch (error) {
      console.log(error)
    }
}