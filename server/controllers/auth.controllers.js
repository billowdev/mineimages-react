const { Users, Addresses, PaymentUsers } = require("../models");
const bcrypt = require("bcrypt");
const { createTokens } = require("../middlewares/AuthMiddleware");
const { sign, verify } = require("jsonwebtoken");
const mailgun = require("mailgun-js");
const DOMAIN = process.env.MAILGUN_DOMAIN_NAME;
const mg = mailgun({ apiKey: process.env.MAINGUN_API_KEY, domain: DOMAIN });

exports.signupController = (req, res) => {
  const { firstName, lastName, email, password, telephone } = req.body;
  Users.findOne({ where: { email: email } }).then((response) => {
    if (response != null) {
      res.status(400).json({ success: false, msg: "email has already exists" });
    } else {
      const token = sign(
        { firstName, lastName, email, password, telephone },
        process.env.JWT_ACC_ACTIVATE,
        { expiresIn: "20m" }
      );

      const data = {
        from: "noreply@mineimages.com",
        to: email,
        subject: "Account Activation Link",
        html: `
          <h2>Please click on given link to activate your account</h2>
          <p>${process.env.CLIENT_URL}/authentication/activate/${token}</p>
          `,
      };
      mg.messages().send(data, function (err, body) {
        if (err) {
          return res.status(400).json({ success: false, error: err.message });
        }
        return res.json({
          message: "Email has been sent, kindly acctivate your account",
        });
      });
    }
  });
};

exports.activateAccount = (req, res) => {
  // tutorial : Email Account Verification - Node and Express
  // https://www.youtube.com/watch?v=CEim3tZsp1Y
  const { token } = req.body;
  if (token) {
    verify(token, process.env.JWT_ACC_ACTIVATE, function (err, decodedToken) {
      if (err) {
        return res.status(400).json({ error: "Incorrect or Expried link." });
      }
      const { firstName, lastName, email, password, telephone } = decodedToken;

      // ========================================================================

      Users.findOne({ where: { email: email } }).then((response) => {
        if (response != null) {
          
          res
            .status(400)
            .json({ success: false, msg: "email has already exists" });
        } else {
          // ---- SactOverFlow //
          // https://stackoverflow.com/questions/16723507/get-last-inserted-id-sequelize
          // https://stackoverflow.com/questions/61028014/inserting-data-in-multiple-tables-using-sequelize

          bcrypt.hash(password, 10).then((hash) => {
            Users.create({
              password: hash,
              email: email,
              firstName: firstName,
              lastName: lastName,
              telephone: telephone,
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

                return res.json("USER REGISTER SUCCESSFULY");
              })
              .catch((err) => {
                if (err) {
                  console.log("Error in signup while account activation", err);
                  return res
                    .status(400)
                    .json({ error: "Error activating account" });
                }
              });
          });
        }
      });

      // ========================================================================
    });
  } else {
    return res.status(422).json({ error: "Something went wrong !!!!" });
  }
};

exports.signinController = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ where: { email: email } });

  if (user) {
    const dbPassword = user.password;
    bcrypt
      .compare(password, dbPassword)
      .then((math) => {
        if (!math) {
          return res
            .status(400)
            .json({ error: "wrong email & password combination!" });
        } else {
          const accessToken = createTokens(user);

          res.cookie("access-token", accessToken, {
            maxAge: 60 * 60 * 24 * 30 * 1000,
            httpOnly: true,
          });
          res.json("LOGGED IN SUCCESSFULY");
        }
      })
      .catch((err) => {
        return res.status(400).json({ error: err });
      });
  } else {
    return res.status(400).json({ error: "user doesn't Exist" });
  }
};
