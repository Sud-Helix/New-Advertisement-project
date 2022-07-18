const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const router = require("express").Router();

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/logout", userController.logout);

router.get("/refresh_token", userController.refreshToken);

router.get("/info", auth, userController.getInfoUser);

module.exports = router;
