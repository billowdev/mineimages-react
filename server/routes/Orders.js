const express = require("express");
const router = express.Router();
const { Orders, Transactions } = require("../models");

router.get("/", async (req, res) => {
  const listOfOrders = await Orders.findAll();
  res.json(listOfOrders);
  // res.send("Hellow world")
});

router.post("/", async (req, res) => {
  let post = req.body;
  const isTransactionExist = await Transactions.findOne({
    where: { UserId: post.UserId, state: "oncart" },
  });

  if (isTransactionExist) {
    post.TransactionId = isTransactionExist.id;
    await Orders.create(post);
  } else {
    await Transactions.create({ UserId: post.UserId }).then((res) => {
      post.TransactionId = res.id;
    });
    await Orders.create(post);
  }

  await Orders.create(post);
  res.json(post);
});

router.post("/transaction", async (req, res) => {
  const post = req.body;
  await OrderDetails.create(post);
  res.json(post);
});

module.exports = router;
