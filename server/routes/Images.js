const express = require("express");
const router = express.Router();
const { Images, Categories } = require("../models");
const { cloudinary } = require("../utils/cloudinary");

router.get("/", async (req, res) => {
  const listOfImages = await Images.findAll();
 	 res.json(listOfImages);
	// res.send("Hellow world")
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
	const post = await Images.findByPk(id);
	res.json(post);
});

router.post("/", async (req, res) => {
  const post = req.body;
  await Images.create(post);
  res.json(post);
});

router.post("/categories", async (req, res) => {
  const post = req.body;
  await Categories.create(post);
  res.json(post);
});

module.exports = router;
