const express = require("express");
const app = express();
const cors = require('cors')
app.use(cors()); 
app.use(express.json());
const db = require("./models");

// Routers
const Images = require("./routes/Images");
app.use("/insert_imgage", Images);

const Users = require("./routes/Users");
app.use("/insert_user", Users);


const Orders = require("./routes/Orders");
app.use("/insert_order", Orders);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
