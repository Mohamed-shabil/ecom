import { verifyToken } from '../auth/auth.js'

const authMiddleware = async (req,res,next)=>{
    let token = req.cookies.jwt;
    
    if(token){
        try{
            const decode = verifyToken(token);
        }catch(error){
            res.status(401).json({
                message:'Unautherized',
                error:error.message
            })
        }
    }else{
        res.status(401).json({
            message:'Unautherized',
            error:'No token provided'
        })
    }
}

export default authMiddleware;