const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const cors = require('cors')
app.use(cors()); 
app.use(express.json());
app.use(cookieParser());

const db = require("./models");

// Routers
const Images = require("./routes/Images");
app.use("/insert_imgage", Images);

const Users = require("./routes/Users");
app.use("/user", Users);

const Orders = require("./routes/Orders");
app.use("/order", Orders);

const SignUp = require("./routes/SignUp");
app.use("/signup", SignUp);

const SignIn = require("./routes/SignIn");
app.use("/signin", SignIn);


db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
