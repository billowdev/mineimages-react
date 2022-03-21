const { Orders, Transactions, Images } = require("../models");

exports.getAllOrders = async (req, res) => {
  const UserId = req.user.id;
  const listOrderOncart = await Orders.findAll({
    where: { UserId: UserId, status: "oncart" },
  });

  const listOrderComplete = await Orders.findAll({
    where: { UserId: UserId, status: "complete" },
  });

  const listOrderTransaction = await Orders.findAll({
    where: { UserId: UserId, status: "transaction" },
  });

  res.json({
    oncart: listOrderOncart,
    complete: listOrderComplete,
    transaction: listOrderTransaction,
  });
};
