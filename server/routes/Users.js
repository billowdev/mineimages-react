const express = require("express");
const router = express.Router();
const { Users, Addresses, PaymentUsers } = require("../models");

router.get("/", async (req, res) => {
  const listOfUsers = await Users.findAll();
  res.json(listOfUsers);
  // res.send("Hellow world")
});

router.post("/", async (req, res) => {
  // ---- SactOverFlow //
  // https://stackoverflow.com/questions/16723507/get-last-inserted-id-sequelize
  // https://stackoverflow.com/questions/61028014/inserting-data-in-multiple-tables-using-sequelize

  const post = req.body; // get request
  // await Users.create(post);

  const user = await Users.create(post);

  // constuctor for hook field on Address
  let address = {
    "addressLine1": "",
    "city": "",
    "postalCode": "",
    "country": "",
    "UserId":user.id

  };
  // constuctor for hook field on PaymentUsers
  let payment = {
    "provider":"",
    "cardNumber":"",
    "expiryDate":"",
    "securityCode":"",
    "UserId":user.id
  };
  // hook field on Address
  await Addresses.create(address);
  // hook field on PaymentUsers
  await PaymentUsers.create(payment);

  res.json(post);
});

router.post("/payment/:id", async (req, res) => {
  const post = req.body;
  const id = req.params.id;
  await PaymentUsers.update(post, { where: { UserId: id } });
  res.json(post);
});

router.post("/address/:id", async (req, res) => {
  const post = req.body;
  const id = req.params.id;
  await Addresses.update(post, { where: { UserId: id } });
  res.json(post);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Images.findByPk(id);
  res.json(post);
});

module.exports = router;
