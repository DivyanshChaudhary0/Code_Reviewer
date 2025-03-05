
const {body,validationResult} = require("express-validator")

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


module.exports = {
    registerValidation,
    loginValidation
}