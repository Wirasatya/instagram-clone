const router = require("express").Router();
const messageCtrl = require("../controllers/Message.ctrl");
const auth = require("../middlewares/auth");

router.post("/message", auth, messageCtrl.createMessage);

router.get("/conversations", auth, messageCtrl.getConversations);

router.get("/message/:id", auth, messageCtrl.getMessages);

router.delete("/message/:id", auth, messageCtrl.deleteMessages);

router.delete("/conversation/:id", auth, messageCtrl.deleteConversation);

module.exports = router;
