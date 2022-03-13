const express = require("express");
const router = express.Router();
const { Users, Addresses, PaymentUsers, Images } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { raw } = require("express");

// ----------------- START Admin route START ----------------- \\
router.get("/lacakp", validateToken, async (req, res) => {
  const id = req.user.id;
  const permission = req.user.permission
  if (!(permission === "admin")) {
    res.status(404).json("404 not found");
  } else {
    const allUser = await Users.findAll();
    res.json(allUser);
  }
});

// ----------------- END Admin route END ----------------- \\

// ----------------- START USER route ----------------- \\

// ----------------- GET DATA USER WHO SIGN IN (RES TO PROFILE PAGE) route ----------------- \\
router.get("/", validateToken, async (req, res) => {
  const reqId = req.user.id;
  const user = await Users.findOne({ where: { id: reqId } });
  const address = await Addresses.findOne({ where: { UserId: reqId } });
  const payment = await PaymentUsers.findOne({ where: { UserId: reqId } });
  const data = {
    user: [
      {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        telephone: user.telephone,
      },
    ],
    address: [
      {
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        postalCode: address.postalCode,
        country: address.country,
      },
    ],
    payment: [
      {
        provider: payment.provider,
      },
    ],
  };
  res.json(data);
});

// ----------------- POST TO update payment route  ----------------- \\
router.post("/payment", validateToken, async (req, res) => {
  const paymentReq = req.body;
  const UserId = req.user.id;
  await PaymentUsers.update(paymentReq, { where: { UserId: UserId } });
  res.json(paymentReq);
});

// ----------------- POST TO update address route ----------------- \\
router.post("/address", validateToken, async (req, res) => {
  const addressReq = req.body;
  const UserId = req.user.id;
  await Addresses.update(addressReq, { where: { UserId: UserId } });
  res.json(addressReq);
});

// ----------------- POST TO Add Image ----------------- \\
router.post("/image", validateToken, async (req, res) => {
  const imageReq = req.body;
  const UserId = req.user.id;

  isExist = await Images.findOne({
    where: { pathOrigin: imageReq.pathOrigin, UserId: UserId },
  });

  if (isExist) {
    res.status(400).json({ error: "Image has already exist" });
  } else {
    imageReq.UserId = req.user.id;
    Images.create(imageReq).then(()=> {
      res.json("Add image successfuly")
    });
  }
});

// ----------------- POST TO Update Image ----------------- \\
router.post("/image/:imgId", validateToken, async (req, res) => {
  const imageReq = req.body;
  const ImageId = req.params.imgId
  const UserId = req.user.id;
  const imageData = await Images.findOne({where:{id:ImageId, UserId:UserId}})
  // if active it can update to remove or other properties
  if (imageData.status == "active"){
    const data = {
      pathOrigin:imageReq.pathOrigin,
      price:imageReq.price,
      visible:imageReq.visible,
      remove:imageReq.remove
    }
    await Images.update(data, {where:{UserId:UserId, id:ImageId}}).then(()=>{
      res.json("update successfully")
    })
  } else {
    const data = {
      pathOrigin:imageReq.pathOrigin,
      price:imageReq.price,
      remove:imageReq.remove
    }
    await Images.update(data, {where:{UserId:UserId, id:ImageId}}).then(()=>{
      res.json("update successfully")
    })
  }
  
});


// ----------------- GET OWN IMAGES DATA ----------------- \\
router.get("/images", validateToken, async (req, res) => {
 const UserId = req.user.id;
 const allImages = await Images.findAll({where:{UserId:UserId}})
 res.json(allImages);
});


module.exports = router;
