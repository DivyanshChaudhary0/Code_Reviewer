
const {Router} = require("express")
const router = Router();
const { registerController, loginController, profileController, otpVerifyController, resendOtpController, userForgotPassword, resetController } = require("../controllers/user.controller");
const { registerValidation , loginValidation, authUser } = require("../middlewares/user.middleware");

router.post("/register", registerValidation , registerController)

router.post("/login", loginValidation, loginController)

router.get("/profile", authUser, profileController)

router.post("/verify", authUser, otpVerifyController)

router.post("/resendOtp", authUser, resendOtpController)

router.post("/forgotPassword", userForgotPassword)

router.post("/resetPassword", resetController)

module.exports = router;