
const {Router} = require("express")
const router = Router();

const {getMessagesController, deleteMessageController} = require("../controllers/message.controller");
const { authUser } = require("../middlewares/user.middleware");

router.get("/get-all/:projectId", authUser, getMessagesController)
router.delete("/delete/:messageId", authUser, deleteMessageController)

module.exports = router;