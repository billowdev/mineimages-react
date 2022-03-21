const { Images } = require("../models");

exports.getAllImagesUserOwned = async (req, res) => {
  try{
    const listOfImages = await Images.findAll({ where: { UserId: req.user.id } });
    res.json(listOfImages);
  } catch (err) {
    console.log(err)
    res.status(401).send("Error")
  }
};

exports.getImageById = async (req, res) => {
  const id = req.params.id;
  const image = await Images.findByPk(id);
  res.json(image);
};

exports.createImageUser = async (req, res) => {
  const imageData = req.body;
  try {

    await Images.create(imageData);
    res.json(imageData);
  } catch (err) {
    console.log("At create Images", err)
    res.status(401).send({success:false, msg:"can't add images"})
  }
};
