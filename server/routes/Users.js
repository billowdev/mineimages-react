const express = require("express");
const router = express.Router();
const { Users, Addresses, PaymentUsers } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


// ----------------- START Admin Section START ----------------- \\
router.get("/lacakp", validateToken, async (req, res) => {
  const id = req.user.id;
  const data = await Users.findOne({ where: { id: id } });
  if (!(data.permission === "admin")) {
    res.json("Permission denied");
  } else {
    const allUser = await Users.findAll();
    res.json(allUser);
  }
});

// ----------------- END Admin Section END ----------------- \\

// ----------------- START USER Section ----------------- \\
router.get("/", validateToken, async (req, res) => {
  const id = req.user.id;
  const user = await Users.findOne({ where: { id: id } });
  const address = await Addresses.findOne({ where: { UserId: id } });
  const payment = await PaymentUsers.findOne({ where: { UserId: id } });
  const data = {
    user: [
      {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        telephone: user.telephone,
      },
    ],
    address: [
      {
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        postalCode: address.postalCode,
        country: address.country,
      },
    ],
    payment: [
      {
        provider: payment.provider,
      },
    ],
  };
  res.json(data);
});


// ----------------- START USER Section ----------------- \\
router.post("/payment", validateToken, async (req, res) => {
  const paymentData = req.body;
  const id = req.user.id;
  await PaymentUsers.update(paymentData, { where: { UserId: id } });
  res.json(paymentData);
});

router.post("/address", validateToken, async (req, res) => {
  const addressData = req.body;
  const id = req.user.id;
  await Addresses.update(addressData, { where: { UserId: id } });
  res.json(addressData);
});

module.exports = router;
