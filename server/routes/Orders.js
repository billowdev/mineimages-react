const express = require("express");
const router = express.Router();
const { Orders, Transactions } = require("../models");

router.get("/", async (req, res) => {
  const listOfOrders = await Orders.findAll();
  res.json(listOfOrders);
  // res.send("Hellow world")
});

router.post("/", async (req, res) => {
  const post = req.body;

  // --------------- these code below will be crash after else condition -------------------
  // ERR_HTTP_HEADERS_SENT
  // 10-Mar-2022 : 08:39
  // by lacakp

  // solution handle turorial
  /*
     How to Create a Node.js Cluster for Speeding Up Your Apps
    - https://www.sitepoint.com/how-to-create-a-node-js-cluster-for-speeding-up-your-apps/
    Let It Crash: Best Practices for Handling Node.js Errors on Shutdown
    - https://blog.heroku.com/best-practices-nodejs-errors
  */

  const transaction = await Transactions.findAll({
    where: { UserId: post.UserId, state: "oncart" },
  }).then((transaction) => {
    return transaction;
  });

  if (transaction.length != 0) {
    const order = await Orders.findAll({
      where: { ImageId: post.ImageId, TransactionId: transaction },
    }).then((res) => {
      return res;
    });

    if (order.length != 0) {
      await Orders.create({
        ImageId: post.ImageId,
        TransactionId: transaction.id,
      });
    } else {
      res.json("order is exist");
    }
  } else {
    const newTransaction = await Transactions.create({ UserId: post.UserId });
    await Orders.create({
      ImageId: post.ImageId,
      TransactionId: newTransaction.id,
    });
  }

  res.json(post);
});

router.post("/transaction", async (req, res) => {
  const post = req.body;
  await OrderDetails.create(post);
  res.json(post);
});

module.exports = router;
