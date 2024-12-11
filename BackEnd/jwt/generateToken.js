import jwt from "jsonwebtoken";

 const createTokenAndSaveCookie = (userId,res)=>{
    const token = jwt.sign({userId}, process.env.JWT_TOKEN,{
        expiresIn: '60d'
    })
    console.log("JWT_TOKEN value:", process.env.JWT_TOKEN); // Debug environment variable
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use `true` in production
        sameSite: "strict",
    });

    console.log("Cookie set successfully.");
};


 export default createTokenAndSaveCookie;

