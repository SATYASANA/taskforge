import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            success:false,
            message:'Access denied, no token provided'
        })
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
        
    }
}

export const authorizedRoles=(...allowedRoles)=>{
   return (req,res,next)=>{
    if(!req.user || !allowedRoles.includes(req.user.role)){
        return res.status(403).json({
            message:'Access denied you are not authorized'
        })
    }
    next()
   }
}