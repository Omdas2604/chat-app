const userModel=require('../models/user.model')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

async function registerUser(req,res){

    const {fullName:{firstName,lastName},email,password}=req.body;
    
    const isUserAlreadyExists=await userModel.findOne({email})

    if(isUserAlreadyExists){
        res.status(400).json({
            message:"User already exists"
        })
    }

    const hashPassword=await bcrypt.hash(password,10);

    const user=await userModel.create({
        fullName:{
            firstName,lastName
        },
        email,
        password:hashPassword
    })

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.cookie('token',token);

    res.status(201).json({
        message:"User registered succesfully",
        user:{
            email:user.email,
            _id:user._id,
            fullName:user.fullName
        }
    })
}

async function loginUser(req,res) {
    const {email,password}=req.body;

    const user=await userModel.findOne({
        email
    })

    if(!user){
        return res.status(400).json({
            message:"Invalid credentials"
        })
    }

    const isPasswordValid=await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid credentials"
        })
    }

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
    res.cookie("token",token)

    res.status(200).json({
        message:"User logged In succesfully",
        user:{
            email:user.email,
            id:user._id,
            fullName:user.fullName
        }
    })

}

async function logoutUser(req, res) {
    try {
        // The primary action is to clear the 'token' cookie.
        res.clearCookie('token');
        
        // Send a success response back to the client.
        res.status(200).json({
            message: "User logged out successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error during logout",
            error: error.message
        });
    }
}

module.exports={
    registerUser,
    loginUser,
    logoutUser
}