
const {Router} = require("express")
const router = Router();

const {getMessagesController} = require("../controllers/message.controller");
const { authUser } = require("../middlewares/user.middleware");

router.get("/get-all/:projectId", authUser, getMessagesController)


module.exports = router;