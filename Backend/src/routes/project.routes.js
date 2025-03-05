
const {Router} = require("express")
const router = Router();
const {createController, listController} = require("../controllers/project.controller")

router.post("/create", createController)

router.get("/list", listController)


module.exports = router;