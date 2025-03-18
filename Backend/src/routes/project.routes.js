
const {Router} = require("express")
const router = Router();
const {createController, listController, reviewCodeController, updateController, getCodeController} = require("../controllers/project.controller");
const { authUser } = require("../middlewares/user.middleware");

router.post("/create", authUser, createController)

router.get("/list", authUser, listController)

router.post("/review", authUser, reviewCodeController)

router.patch("/update/:projectId", authUser, updateController)

router.get("/getCode/:projectId",authUser, getCodeController)

module.exports = router;