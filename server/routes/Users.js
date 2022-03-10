const express = require("express");
const router = express.Router();
const { Users, Address, PaymentUser } = require("../models");

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
  await Users.create(post);



  // ---- case insert userdata and address ----
  
  // const address = await Address.create(post[1]); // insert data from request to address model
  // const addressId = address.id;  // id after insert data to the address model
  // let userData = post[0]; // data user from request 
  // userData.AddressId = addressId // add property AddressId to user data
  // await Users.create(userData) // insert data to the user model

  // await Users.AddressId.create(addressId);
  res.json(post);
    
  });;

router.post("/payment", async (req, res) => {
  const post = req.body;
  await PaymentUser.create(post);
  res.json(post);
});

router.post("/address", async (req, res) => {
  const post = req.body;
  await Address.create(post);
  res.json(post);
});

module.exports = router;
