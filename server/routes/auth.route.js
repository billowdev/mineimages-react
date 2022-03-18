// Load Controllers
const express = require("express");
const router = express.Router();

const { signupController, signinController, activateAccount } = require("../controllers/auth.controllers");

router.post("/signup", signupController);
router.post("/signin", signinController);
router.post("/email-activate", activateAccount)
module.exports = router;
