const { Users, Addresses, PaymentUsers, Images } = require("../models");

// ===================== get section =====================

exports.getDataUserController = async (req, res) => {
  const dataUser = await Users.findOne({ where: { id: req.user.id } });
  const address = await Addresses.findOne({ where: { UserId: req.user.id } });
  const payment = await PaymentUsers.findOne({
    where: { UserId: req.user.id },
  });
  const data = {
    user: [
      {
        id: dataUser.id,
        email: dataUser.email,
        firstName: dataUser.firstName,
        lastName: dataUser.lastName,
        telephone: dataUser.telephone,
        avartar: dataUser.avartar,
        about: dataUser.about,
        permission: dataUser.permission,
        status: dataUser.status,
        createAt: dataUser.createAt,
        updateAt: dataUser.updateAt,
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
  res.status(200).send(data);
};

exports.getImagesUser = async (req, res) => {
  const { id } = req.user.id;
  const allImages = await Images.findAll({ where: { UserId: id } });
  res.json(allImages);
};

// ===================== create (post) section =====================

exports.createPaymentUser = async (req, res) => {
  const paymentReq = req.body;
  const UserId = req.user.id;
  await PaymentUsers.update(paymentReq, { where: { UserId: UserId } });
  res.json(paymentReq);
};

exports.createAddressUser = async (req, res) => {
  const addressReq = req.body;
  const UserId = req.user.id;
  await Addresses.update(addressReq, { where: { UserId: UserId } });
  res.json(addressReq);
};

exports.createImageUser = async (req, res) => {
  const imageReq = req.body;
  const UserId = req.user.id;

  isExist = await Images.findOne({
    where: { pathOrigin: imageReq.pathOrigin, UserId: UserId },
  });

  if (isExist) {
    res.status(500).json({ error: "Image has already exist" });
  } else {
    imageReq.UserId = req.user.id;
    Images.create(imageReq).then(() => {
      res.json("Add image successfuly");
    });
  }
};

// ===================== update (put, patch) section =====================

exports.updateImageUSer = async (req, res) => {
  const imageReq = req.body;
  const ImageId = req.params.imgId;
  const UserId = req.user.id;
  const imageData = await Images.findOne({
    where: { id: ImageId, UserId: UserId },
  });
  // if active it can update to remove or other properties
  if (imageData.status == "active") {
    const data = {
      pathOrigin: imageReq.pathOrigin,
      price: imageReq.price,
      visible: imageReq.visible,
      remove: imageReq.remove,
    };
    await Images.update(data, { where: { UserId: UserId, id: ImageId } }).then(
      () => {
        res.json("update successfully");
      }
    );
  } else {
    const data = {
      pathOrigin: imageReq.pathOrigin,
      price: imageReq.price,
      remove: imageReq.remove,
    };
    await Images.update(data, { where: { UserId: UserId, id: ImageId } }).then(
      () => {
        res.status(201).send("update successfully");
      }
    );
  }
};
