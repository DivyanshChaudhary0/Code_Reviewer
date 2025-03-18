
const {body,validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")

const registerValidation = [
    body("username")
        .notEmpty().withMessage("username is required")
        .isLength({min:3,max:30}).withMessage("username should be 3 to 30 characters")
        .trim(),
    body("email")
        .notEmpty().withMessage("email is required")
        .isEmail().withMessage("email should be valid")
        .normalizeEmail()
        .trim(),
    body("password")
        .notEmpty().withMessage("password is required")
        .isLength({min:6,max:15}).withMessage("password will be minimum 6 and maximum 10"),


        function(req,res,next){
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(401).json({
                    errors: errors.array()
                })
            }
            next();
        }
    
]

const loginValidation = [
    body("email")
        .notEmpty().withMessage("email is required")
        .isEmail().withMessage("email should be valid")
        .trim(),
    body("password")
        .notEmpty().withMessage("password is required")
        .isLength({min:6,max:15}).withMessage("password will be minimum 6 and maximum 10"),

        function(req,res,next){
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(401).json({
                    errors: errors.array()
                })
            }
            next();
        }
]

const authUser = async function(req,res,next){
    try{
        const token = req.headers?.authorization?.split(" ")[1];
        if(!token){
            return res.status(400).json({message: "Unauthorized"})
        }

        const decoded = jwt.verify(token,"huihui");
        if(!decoded){
            return res.status(400).json({message: "Unauthorized"})
        }

        req.user = decoded;
        next();
    }
    catch(err){
        res.status(401).json({
            error: err.message
        })
    }
}

module.exports = {
    registerValidation,
    loginValidation,
    authUser
}
