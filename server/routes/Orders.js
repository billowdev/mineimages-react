const express = require("express");
const router = express.Router();
const { Orders } = require("../models");

router.get("/", async (req, res) => {
  const listOfOrders = await Orders.findAll();
 	 res.json(listOfOrders);
	// res.send("Hellow world")
});

router.post("/", async (req, res) => {
  const post = req.body;
  await Orders.create(post);
  res.json(post);
});

module.exports = router;
