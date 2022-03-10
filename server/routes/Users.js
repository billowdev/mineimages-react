const express = require("express");
const router = express.Router();
const { Users, Addresses, PaymentUser } = require("../models");

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

  // ---- case insert userdata and address ----

  const address = await Addresses.create(post[1]); // insert data from request to address model
  const addressId = address.id; // id after insert data to the address model

  const payment = await PaymentUser.create(post[2]); // insert data from request to payment model
  const paymentId = payment.id;

  let userData = post[0]; // data user from request
  userData.AddressId = addressId; // add property AddressId to userData
  userData.PaymentUserId = paymentId; // add property PaymentUserId to userData
  await Users.create(userData); // insert data to the user model

  res.json(post);
});

router.post("/payment", async (req, res) => {
  const post = req.body;
  await PaymentUser.create(post);
  res.json(post);
});

router.post("/address/:id", async (req, res) => {
  const post = req.body;
  const id = req.params.id;
  await Address.update(post, { where: { id: id } });
  res.json(post);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Images.findByPk(id);
  res.json(post);
});

module.exports = router;
