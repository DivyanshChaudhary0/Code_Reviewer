
const {Router} = require("express")
const router = Router();

const {getMessagesController} = require("../controllers/message.controller")

router.get("/get-all/:projectId", getMessagesController)


module.exports = router;