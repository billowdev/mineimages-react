const express = require("express");
const router = express.Router();
const { Images, Categories } = require("../models");
const { cloudinary } = require("../utils/cloudinary");

const {
  getAllImagesUserOwned,
  getImageById,
  createImageUser,
} = require("../controllers/images.controllers");

router.get("/", getAllImagesUserOwned);

router.get("/byId/:id", getImageById);

router.post("/", createImageUser);


module.exports = router;
