const router = require("express").Router();
const authCtrl = require("../controllers/Auth.ctrl");

router.post("/register", authCtrl.register);

router.post("/login", authCtrl.login);

router.post("/logout", authCtrl.logout);

router.post("/refresh_token", authCtrl.generateAccessToken);

module.exports = router;
