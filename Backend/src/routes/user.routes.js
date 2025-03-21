
const {Router} = require("express")
const router = Router();
const { registerController, loginController, profileController } = require("../controllers/user.controller");
const { registerValidation , loginValidation, authUser } = require("../middlewares/user.middleware");

router.post("/register", registerValidation , registerController)

router.post("/login", loginValidation, loginController)

router.get("/profile", authUser, profileController)

module.exports = router;