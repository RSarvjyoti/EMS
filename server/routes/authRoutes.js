const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController");

router.post("/signup", register);
router.post("/signin", login);
router.post("/logout", logout);

module.exports = router;
