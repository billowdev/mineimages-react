const { Images } = require("../models");

exports.getAllImagesUserOwned = async (req, res) => {
  const { id } = req.user.id;
  const listOfImages = await Images.findAll({ where: { UserId: id } });
  res.json(listOfImages);
};

exports.getImageById = async (req, res) => {
  const id = req.params.id;
  const post = await Images.findByPk(id);
  res.json(post);
};

exports.createImageUser = async (req, res) => {
  const imageData = req.body;
  await Images.create(imageData);
  res.json(imageData);
};
