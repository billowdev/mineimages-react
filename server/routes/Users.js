const express = require("express");
const router = express.Router();
const { Users, Addresses, PaymentUsers } = require("../models");
const {validateToken} = require("../middlewares/AuthMiddleware")

router.get("/", validateToken, async (req, res) => {
  const id = req.user.id
  const userData = await Users.findOne({where:{id:id}});
  res.json(userData);
});

router.post("/update_payment", validateToken, async (req, res) => {
  const paymentData = req.body;
  const id = req.user.id;
  await PaymentUsers.update(paymentData, { where: { UserId: id } });
  res.json(paymentData);
});

router.post("/update_address", async (req, res) => {
  const addressData = req.body;
  const id = req.user.id;
  await Addresses.update(addressData, { where: { UserId: id } });
  res.json(addressData);
});


module.exports = router;
