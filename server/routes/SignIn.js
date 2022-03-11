// --------------------- SignIn route --------------------- \\
const express = require("express");
const router = express.Router();
const { Users } = require("../models");

const bcrypt = require("bcrypt");

const { createTokens } = require("../middlewares/AuthMiddleware");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.status(400).json({ error: "user doesn't Exist" });

  const dbPassword = user.password;
  bcrypt.compare(password, dbPassword).then((math) => {
    if (!math) {
      res.status(400).json({ error: "wrong username & password combination!" });
    } else {
      const accessToken = createTokens(user);

      res.cookie("access-token", accessToken, {
        maxAge: 60 * 60 * 24 * 30 * 1000,
        httpOnly: true,
      });
      res.json("LOGGED IN SUCCESSFULY");
    }
  });
});

module.exports = router;
