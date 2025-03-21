
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const messageModel = require("../models/message.model");


const registerController = async function(req,res){
    try{
        const {username,email,password} = req.body;
        const hashed = await bcrypt.hash(password,10);

        const isUserExist = await userModel.findOne({
            or: [{username},{email}]
        })

        if(isUserExist){
            return res.status(400).json({
                message: "User already exist"
            })
        }

        const user = await userModel.create({
            username,
            email,
            password: hashed
        })

        const token = jwt.sign({
            _id: user._id,
            email: user.email
        },"huihui",{expiresIn:"1d"})

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


module.exports = {
    registerController,
    loginController,
    profileController
}
