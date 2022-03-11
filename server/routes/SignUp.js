// --------------------- register route --------------------- \\
const express = require("express");
const router = express.Router();
const { Users, Addresses, PaymentUsers } = require("../models");
const bcrypt = require("bcrypt");

// ---- SactOverFlow //
// https://stackoverflow.com/questions/16723507/get-last-inserted-id-sequelize
// https://stackoverflow.com/questions/61028014/inserting-data-in-multiple-tables-using-sequelize

router.post("/", (req, res) => {
  const dataUser = req.body;

  bcrypt.hash(dataUser.password, 10).then((hash) => {
    Users.create({
      username: dataUser.username,
      password: hash,
      email: dataUser.email,
      firstName: dataUser.firstName,
      lastName: dataUser.lastName,
      telephone: dataUser.telephone,
      status: "user"
    })
      .then((data) => {
        // hook field on Address
        Addresses.create({
          addressLine1: "",
          city: "",
          postalCode: "",
          country: "",
          UserId: data.id,
        });
        // hook field on PaymentUsers
        PaymentUsers.create({
          provider: "",
          cardNumber: "",
          expiryDate: "",
          securityCode: "",
          UserId: data.id,
        });

        res.json("USER REGISTER SUCCESSFULY");
      })
      .catch((err) => {
        if (err) {
          res.status(400).json({ error: err });
        }
      });
  });
});

module.exports = router;
