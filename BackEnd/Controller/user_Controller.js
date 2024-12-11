import  createTokenAndSaveCookie from "../jwt/generateToken.js"
import User from "../Models/UserModel.js"
import bcrypt from "bcryptjs"


 export const signup = async(req,res)=>{
    const {fullname,email,password,confirmPassword} = req.body
    try {
        if(password !== confirmPassword){
            return res.status(400).json({
                message:"Passwords do not match"
            })
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                message:"User already Registerd"
            })
        }

        //Hashing the password
        const hashPassword = await bcrypt.hash(password,10)
        const newUser = await new User({
            fullname,
            email,
            password:hashPassword //:bcrypt.hashSync(password,10)
        })
        await newUser.save()
        if(newUser){
            // createTokenAndSaveCookie(newUser._id,res);
            createTokenAndSaveCookie(newUser._id, res);
            res.status(201).json({
                message:"User created Successfully",
                user:{
                    id:newUser._id,
                    fullname:newUser.fullname,
                    email:newUser.email
                }  
           })
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal Server Error"
        })
    } 
}

export const login = async(req,res)=>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({ email });
        const isMatch = await bcrypt.compare(password, user.password)
        if(!user || !isMatch){
            return res.status(400).json({
                message:"Invalid Email or Password"
            })
        }
        createTokenAndSaveCookie(user._id,res);
       
        res.status(200).json({
            message:"User logged in Successfully",
            user:{
                id:user._id,
                fullname:user.fullname,
                email:user.email
            }  
        })   
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal Server Error"
        })
        
    }
}

export const logout = async(req,res) =>{
    try {
        res.clearCookie("jwt")
        res.status(200).json({
            message:"User logged out Successfully"
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal Server Error"
        }) 
    }
}


//get user
export const allUser = async(req,res) =>{
    try {
        const loggedInUser = req.user._id;
      const filteredUsers = await User.find({_id:{$ne:loggedInUser}}).select("-password") ;
      res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("Error in allusers controller ", error);     
    }
}