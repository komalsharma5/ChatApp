import jwt from "jsonwebtoken"
import User from "../Models/UserModel.js"

const secureRoute = async(req,res,next)=>{
  
    try {
        const token = req.cookies.jwt
        console.log("Cookies:", req.cookies);
        
        console.log("Token created:", token)
        if(!token){
            return res.status(401).json({message:"No token provided"})
        };
     

        const decode = jwt.verify(token, process.env.JWT_TOKEN)
        if(!decode){
            return res.status(401).json({message:"Invalid token"})
        }
        const user = await User.findById(decode.userId).select("-password")
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        req.user = user
       
        next()
    } catch (error) {
        console.log("Error in secureRoute", error);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
}

export default secureRoute