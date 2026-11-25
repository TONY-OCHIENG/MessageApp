import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


export const accessToken = async (request,response,next) => {
    const token = request.cookies.access
    if (!token) {
        const refreshed = await refreshToken(request, response) // must NOT send a response itself
        if (!refreshed) {
            return response.status(401).json({ success: false, message: "Unauthorised access" })
        }
        return next()
     } else {
        jwt.verify(token,process.env.TOKEN_SECRET,(err,decoded) => {
            if (err) {
                return response.status(200).json({success:false, message:"Access denied"})
            } else {
                request.userId = decoded.userId
                next()
            }
        })
    }
}

const refreshToken = (request,response) => {
    const token = request.cookies.refresh
    let exist = false
    if (!token) {
        return response.status(403).json({success: false, message: "unauthorised access"})
    } else {
        jwt.verify(token,process.env.TOKEN_SECRET,(err,decoded) => {
            if (err) {
                return response.status(403).json({success: false, message: "Access denied"})
            } else {
                const accessToken = jwt.sign({user_id: decoded.user_id},process.env.TOKEN_SECRET,{expiresIn:'1m'})   
                response.cookie("access",accessToken,({
                    httpOnly: true,
                    secure:process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 1 * 60 * 1000
                }))  
                exist = true             
            }
        })
    }    
    return exist; 
}
