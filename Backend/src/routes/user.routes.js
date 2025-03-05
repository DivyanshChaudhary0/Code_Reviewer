
const {Router} = require("express")
const router = Router();
const { registerController, loginController } = require("../controllers/user.controller");
const { registerValidation , loginValidation } = require("../middlewares/user.middleware");

router.post("/register", registerValidation , registerController)

router.post("/login", loginValidation, loginController)

module.exports = router;