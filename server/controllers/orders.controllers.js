const { Orders, Transactions, Images } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

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
      });
    } else if (sortColumn) {
      order = await Orders.findAll({
        offset: startIndex,
        limit: perPage,
        order: [[sortColumn, sortDirection]],
        where: { UserId: reqUserId },
      });
    } else {
      order = await Orders.findAll({
        offset: startIndex,
        limit: perPage,
        where: { UserId: reqUserId },
        raw:true
      });
      let imageList = [];

      order.forEach((element) => {
        imageList.push(element.ImageId);
      });

      image = await Images.findAll({
        where: {
          id: {
            [Op.in]: imageList,
          },
        },
        raw:true,
      });
    }

    let orders = [];
    let imageorder = {};

    order.forEach((odr) => {
      let newOrderObj = odr
      // let newObj
      image.forEach((el) => {
        let newObj = {
          ImgId: el.id,
          Imgname: el.name,
          ImgpathOrigin: el.pathOrigin,
          ImgpathWatermark: el.pathWatermark,
          Imgprice: el.price,
          ImgOwnerId: el.UserId,
        };
        let rawObj = {...newOrderObj, ...newObj}
        orders.push(rawObj);
      });
    });





    res.json({
      page: page,
      per_page: perPage,
      total_pages: totalPages,
      total: total,
      // order:{order:order, image:image}
      orders,
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
