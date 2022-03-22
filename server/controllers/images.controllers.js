const { cloudinary } = require("../utils/cloudinary");
const { Images } = require("../models");
const Op = require("sequelize").Op;

// =================== FOR USER ROUTE ==========================
exports.getImagesUser = async (req, res) => {
  try {
    const reqUserId = req.user.id;
    const page = parseInt(req.query.page);
    const perPage = parseInt(req.query.per_page);
    const sortColumn = req.query.sort_column;
    const sortDirection = req.query.sort_direction;
    const search = req.query.search;
    const startIndex = (page - 1) * perPage;

    const total = await Images.count({ where: { UserId: reqUserId } });

    let totalPages = total / perPage;
    let data;
    if (search && sortColumn) {
      data = await Images.findAll({
        offset: startIndex,
        limit: perPage,
        where: {
          UserId: reqUserId,
          name: {
            [Op.like]: `%${search}%`,
          },
        },
        order: [[sortColumn, sortDirection]],
      });
    } else if (search) {
      data = await Images.findAll({
        where: {
          UserId: reqUserId,
          name: {
            [Op.like]: `%${search}%`,
          },
        },
      });
    } else if (sortColumn) {
      data = await Images.findAll({
        offset: startIndex,
        limit: perPage,
        where: { UserId: reqUserId },
        order: [[sortColumn, sortDirection]],
      });
    } else {
      data = await Images.findAll({
        offset: startIndex,
        limit: perPage,
        where: { UserId: reqUserId },
      });
    }
    res.json({
      page: page,
      per_page: perPage,
      total_pages: totalPages,
      total: total,
      data,
    });
  } catch (err) {
    console.log("Error at get Images user controllers", err);
    res.status(401).send("Error can't get Images");
  }
};

// =================== FOR USER ROUTE ==========================

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

exports.updateImageUser = async (req, res) => {
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

exports.getImageById = async (req, res) => {
  const id = req.params.id;
  const image = await Images.findByPk(id);
  res.json(image);
};

exports.uploadImageByUser = async (req, res) => {
  try {
    const id = req.user.id;
    const fileStr = req.body.data;
    const uploadOriginalResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "mineimages_original",
    });
    const uploadWatermarkResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "mineimages_watermark",
    });

    const rawImagesData = {
      name: "",
      detail: "",
      pathOrigin: uploadOriginalResponse.secure_url,
      pathWatermark: uploadWatermarkResponse.secure_url,
      price: 500,
      UserId: id,
    };
    await Images.create(rawImagesData);

    console.log(uploadOriginalResponse.secure_url);
    // console.log(uploadWatermarkResponse);

    res.json({ msg: "File uploaded sucessfuly" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "somthing went wrong" });
  }
};
