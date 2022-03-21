const { validateToken } = require("../middlewares/AuthMiddleware");
const express = require("express");
const router = express.Router();
const {
  getDataUserController,
  getImagesUser,
  createAddressUser,
  createPaymentUser,
  createImageUser,
  updateImageUSer,
} = require("../controllers/user.controllers");

// ----------------- USER route ----------------- \\

// ----------------- GET DATA USER WHO SIGN IN (RES TO PROFILE PAGE) route ----------------- \\
router.get("/", validateToken, getDataUserController);

// ----------------- POST TO update payment route  ----------------- \\
router.post("/payment", validateToken, createPaymentUser);

// ----------------- POST TO update address route ----------------- \\
router.post("/address", validateToken, createAddressUser);

// ----------------- POST TO Add Image ----------------- \\
router.post("/image", validateToken, createImageUser);

// ----------------- POST TO Update Image ----------------- \\
router.post("/image/:imgId", validateToken, updateImageUSer);

// ----------------- GET OWN IMAGES DATA ----------------- \\
router.get("/images", validateToken, getImagesUser);


module.exports = router;
