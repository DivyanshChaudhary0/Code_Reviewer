
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const sendOTP = require("../utils/sendOTP");
const generateOTP = require("../utils/generateOTP");


const registerController = async function(req,res){
    try{
        const {username,email,password} = req.body;
        const hashed = await bcrypt.hash(password,10);

        const isUserExist = await userModel.findOne({
            $or: [{username},{email}]
        })

        if(isUserExist){
            return res.status(400).json({
                message: "User already exist"
            })
        }

        const otp = generateOTP();
        const otpExpiary = Date.now() + 2 * 60 * 1000

        const user = await userModel.create({
            username,
            email,
            password: hashed,
            otp,
            otpExpiary
        })

        const token = jwt.sign({
            _id: user._id,
            email: user.email
        },"huihui",{expiresIn:"1d"})

        await sendOTP({
            email: user.email,
            subject: "Code Reviewer OTP verification",
            html: `<p> Your verification code is : <strong> ${otp} </strong> </p>`
        })

        delete user._doc.otp
        delete user._doc.otpExpiary

        res.status(200).json({
            user,
            token
        })

    }
    catch(err){
        res.status(401).json({
            message: err.message
        })
    }
}

const loginController = async function(req,res){
    try{
        const {email,password} = req.body;

        const user = await userModel.findOne({email}).select("+password")
        if(!user){
            return res.status(401).json({message: "Invalid email or password"})
        }

        const isMatched = await bcrypt.compare(password,user.password)

        if(!isMatched){
            return res.status(401).json({message: "Invalid email or password"})
        }

        const token = jwt.sign({
            _id: user._id,
            email: user.email
        },"huihui",{expiresIn:"1d"})

        delete user._doc.password

        res.status(200).json({
            user,
            token
        })

    }
    catch(err){
        res.status(401).json({
            message: err.message
        })
    }
}

const profileController = async function(req,res){
    try{
        const id = req.user._id;
        const user = await userModel.findById(id);
        res.status(200).json({
            user
        })
    }
    catch(err){
        res.status(400).json({
            error: err.message,
            message: "Can not get profile"
        })
    }
}

const otpVerifyController = async function(req,res){
    try{
        const {otp} = req.body;
        
        if(otp.length <= 0){
            return res.status(400).json({message: "Otp is required"})
        }

        const user = await userModel.findById(req.user._id);
        if(!user){
            return res.status(400).json({message: "user not found"})
        }

        if(user.isVerified){
            return res.status(400).json({message: "user is already verified"})
        }

        if(Date.now() > user.otpExpiary){
            return res.status(400).json({message: "Otp is expired"})
        }

        if(otp !== user.otp){
            return res.status(400).json({message: "Invalid otp"})
        }

        user.isVerified = true;
        await user.save();

        delete user._doc.otp
        delete user._doc.otpExpiary

        res.status(200).json({
            message: "otp verified successfully",
            user
        })

    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

const resendOtpController = async function(req,res){
    try{
        const user = await userModel.findById(req.user._id);
        if(!user){
            return res.status(400).json({message: "user not found"})
        }

        if(user.isVerified){
            return res.status(400).json({message: "user is already verified"})
        }

        const otp = generateOTP()
        user.otp = otp;
        user.otpExpiary = Date.now() + 2 * 60 * 1000;
        await user.save();

        await sendOTP({
            email: user.email,
            subject: `Resend Otp (valid for 2 minutes)`,
            html: `<p> OTP verification is : ${otp} (valid for 2 minutes) </p>`
        })

        delete user._doc.otp
        delete user._doc.otpExpiary

        res.status(200).json({
            message: "Otp send successfully",
            user
        })

    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

const userForgotPassword = async function(req,res){
    const {email} = req.body;
    if(!email){
        return res.status(400).json({message: "Enter a valid email address"})
    }

    const user = await userModel.findOne({email});
    if(!user){
        return res.status(400).json({message: "Invalid Email address"})
    }

    try{
        const otp = generateOTP();
        const otpExpiary = Date.now() + 2 * 60 * 1000;

        user.otp = otp;
        user.otpExpiary = otpExpiary
        await user.save();

        await sendOTP({
            email,
            subject: "Forgot password OTP",
            html: `<p> Forgot password OTP is : ${otp} and it is valid for 2 minutes </p>`
        })

        res.status(200).json({
            message: "Otp send to email"
        })

    }
    catch(err){
        res.status(500).json({
            error: err.message,
            message: "Can not send otp to email, Try again"
        })
    }
}

const resetController = async function(req,res){
    try{
        const {otp,password} = req.body;

        const user = await userModel.findOne({otp}).select("+password")

        if(!user){
            return res.status(400).json({
                message: "User not found"
            })
        }

        if(Date.now() > user.otpExpiary){
            return res.status(404).json({message: "Otp expired"})
        }

        const hashedPass = await bcrypt.hash(password,10)

        user.password = hashedPass;
        await user.save();

        delete user._doc.otp
        delete user._doc.otpExpiary
        delete user._doc.password

        res.status(200).json({
            user,
            message: "Password reset successfully...!"
        })

    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    registerController,
    loginController,
    profileController,
    otpVerifyController,
    resendOtpController,
    userForgotPassword,
    resetController
}
