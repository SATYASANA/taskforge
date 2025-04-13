import jwt from 'jsonwebtoken'

export const generateJWTToken = (userId,role,res)=>{
    const token = jwt.sign({userId,role},process.env.JWT_SECRET,{expiresIn:'1D'})
    res.cookie('token',token,{
        maxAge:7*60*60*1000,
        httpOnly:true,
        secure:process.env.NODE_ENV !=='DEVELOPEMENT'
    })
}