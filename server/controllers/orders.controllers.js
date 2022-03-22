const { Orders, Transactions, Images, Users } = require("../models");
const Op = require("sequelize").Op;
const { conn } = require("../config/rawQueryConfig");

exports.getAllOrders = async (req, res) => {
  try {
    const reqUserId = req.user.id;
    let order, image;
    const page = parseInt(req.query.page);
    const perPage = parseInt(req.query.per_page);
    const sortColumn = req.query.sort_column;
    const sortDirection = req.query.sort_direction;
    const search = req.query.search;
    const startIndex = (page - 1) * perPage;

    const total = await Orders.count();
    let totalPages = total / perPage;

    if (search && sortColumn) {
      order = await Orders.findAll({
        offset: startIndex,
        limit: perPage,
        order: [[sortColumn, sortDirection]],
        where: {
          [Op.and]: [
            { where: { UserId: reqUserId } },
            {
              [Op.or]: {
                id: {
                  [Op.like]: `%${search}%`,
                },
                status: {
                  [Op.like]: `%${search}%`,
                },
                ImageId: {
                  [Op.like]: `%${search}%`,
                },
                TransactionId: {
                  [Op.like]: `%${search}%`,
                },
              },
            },
          ],
        },
        raw: true,
      });
    } else if (search) {
      order = await Orders.findAll({
        where: {
          [Op.and]: [
            { where: { UserId: reqUserId } },
            {
              [Op.or]: {
                id: {
                  [Op.like]: `%${search}%`,
                },
                status: {
                  [Op.like]: `%${search}%`,
                },
                ImageId: {
                  [Op.like]: `%${search}%`,
                },
                TransactionId: {
                  [Op.like]: `%${search}%`,
                },
              },
            },
          ],
        },
        raw: true,
      });
    } else if (sortColumn) {
      data = await Orders.findAll({
        offset: startIndex,
        limit: perPage,
        order: [[sortColumn, sortDirection]],
        where: {UserId:reqUserId},
        include: [{
          model: Images,
          require: true,
        }]
      })

    } else {
      // order = await Orders.findAll({
      //   offset: startIndex,
      //   limit: perPage,
      //   where: { UserId: reqUserId },
      //   raw: true,
      // });

      // let imageList = [];
      // order.forEach((element) => {
      //   imageList.push(element.ImageId);
      // });


      data = await Orders.findAll({
        where: {UserId:reqUserId},
        include: [{
          model: Images,
          require: true,
        }]
      })
      console.log(data)

   

      // image = await Images.findAll({
      //   where: {
      //     id: {
      //       [Op.in]: imageList,
      //     },
      //   },
      //   raw: true,
      // });

      // let OwnerImageList = [];
      // image.forEach((element) => {
      //   OwnerImageList.push(element.UserId);
      // });
    }

    // ================= destructuring new format for response to order user page
    // let orders = [];
    // for (var i = 0; i <= order.length - 1; i++) {
    //   orders.push({
    //     ...order[i],
    //     ...{
    //       ImgId: image[i].id,
    //       ImgName: image[i].name,
    //       ImgPathOrigin: image[i].pathOrigin,
    //       ImgPathWatermark: image[i].pathWatermark,
    //       ImgPrice: image[i].price,
    //       ImgOwner: image[i].UserId,
    //     },
    //   });
    // }
    console.log(data);
    res.json({
      page: page,
      per_page: perPage,
      total_pages: totalPages,
      total: total,
      data,
    });
  } catch (err) {
    console.log("Error at get order user controllers", err);
    res.status(401).send("Error can't get order");
  }

  // ===========================================================

  // const listOrderOncart = await Orders.findAll({
  //   where: { UserId: UserId, status: "oncart" },
  // });

  // const listOrderComplete = await Orders.findAll({
  //   where: { UserId: UserId, status: "complete" },
  // });

  // const listOrderTransaction = await Orders.findAll({
  //   where: { UserId: UserId, status: "transaction" },
  // });

  // const response = {
  //   order: {
  //     oncart: listOrderOncart,
  //     complete: listOrderComplete,
  //     transaction: listOrderTransaction,
  //   },
  // }
  // res.json(response);
};
