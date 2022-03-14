const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require('cors')
const app = express();
const db = require("./models");
app.use(cors()); 
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Routers
const Images = require("./routes/Images");
app.use("/images", Images);

const Users = require("./routes/Users");
app.use("/user", Users);

const Orders = require("./routes/Orders");
app.use("/order", Orders);

const SignUp = require("./routes/SignUp");
app.use("/signup", SignUp);

const SignIn = require("./routes/SignIn");

app.use("/signin", SignIn);


const PORT = 3001;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
