const express = require("express");
const router = express.Router();
const { Orders, Transactions } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { Op } = require("sequelize");

router.get("/", validateToken, async (req, res) => {
  // const UserId = req.user.id;
  // const listTransaction = await Transactions.findAll({
  //   where: { UserId: UserId },
  // });
  // let orders = {};
  // listTransaction.forEach((transaction) => {
  //   async () => {
  //     const foundOrder = await Orders.findAll({
  //       where: { TransactionId: transaction.id },
  //     }).then((order) => {
  //       return order;
  //     });
  //     orders.assign(foundOrder);
  //   };
  // });
  // res.json(orders);
});

router.post("/", validateToken, async (req, res) => {
  const ImageId = req.body.ImageId;
  const UserId = req.user.id;

  // solution handle turorial
  /*
     How to Create a Node.js Cluster for Speeding Up Your Apps
    - https://www.sitepoint.com/how-to-create-a-node-js-cluster-for-speeding-up-your-apps/
    Let It Crash: Best Practices for Handling Node.js Errors on Shutdown
    - https://blog.heroku.com/best-practices-nodejs-errors
  */

  /* -------------- Order route -------------- 
  | order condition: 
  | 1. if that user has already owner of that image (check it by choice 2)
  | 2. which each transaction user who login state (on "pending" or "complete") -> transaction
  | 3.   if transaction and target ImageId has already in Orders:
  | 4.      return false; |# -- end process -- #|
  | 5. if (user has transaction state "oncart"):
  | 6.      if (the [target ImageId] and TransactionId["oncart"] is exist):
  | 7.          return false; |# -- end process -- #|
  | 8.      Else if that [ImageId and that Transaction] is not exist:
  | 9.          create order with the target ImageId and That TransactionId which oncart state;
  | 10.  else (user has not TransactionId["oncart"]):
  | 11.       then create Transaction.then( create order with target ImageId and this.Transaction.id )
  | 12. |# -- end process -- #|
  */
  let isOwned = false;
  // ----------------- condition 1 - 4 working ------------------- \\
  // these part waiting for improve coding
  const transactionNotOncart = await Transactions.findAll({
    where: {
      [Op.and]: [
        { UserId: UserId },
        { [Op.or]: [{ state: "complete" }, { state: "pending" }] },
      ],
    },
  }).then((data) => {
    let myList = [];
    data.forEach((element) => {
      myList.push(element.id);
    });
    return myList;
  });

  if (transactionNotOncart) {
    // check transaction that not oncart there are in orders table ?
    let data = [];
    data.push(
      await Orders.findOne({
        where: { ImageId: ImageId, TransactionId: transactionNotOncart },
      })
        .then((result) => result)
        .catch((err) => {
          res.status(400).json({ error: err });
        })
    );
        
    if (data[0] != null) {
      isOwned = true;
      res.json("this images you have already owned");
    } else {
      isOwned = false;
      res.json("not found transaction on state complete or pending");
    }
  }

  // ----------------- condition 5 - 12 working ------------------- \\
  if (!isOwned) {
    const transactionIsExist = await Transactions.findOne({
      where: { UserId: UserId, state: "oncart" },
    });
    // console.log(`\n\n${transactionIsExist.id}`);

    if (transactionIsExist) {
      const orderIsExist = await Orders.findOne({
        where: { ImageId: ImageId, TransactionId: transactionIsExist.id },
      });

      if (!orderIsExist) {
        Orders.create({
          ImageId: ImageId,
          TransactionId: transactionIsExist.id,
        })
          .then(() => {
            res.json("create order successfully");
          })
          .catch((err) => {
            if (err) {
              res.status(400).json({ error: err });
            }
          });
      } else {
        res.json("You has already buy this image");
      }
    } else {
      // console.log("\n this is false state \n");
      Transactions.create({ UserId: UserId }).then((transaction) => {
        Orders.create({
          ImageId: ImageId,
          TransactionId: transaction.id,
        }).then(() => {
          res.json("create order successfully");
        });
      });
    }
  }
});

router.post("/transaction", async (req, res) => {
  const post = req.body;
  await OrderDetails.create(post);
  res.json(post);
});

module.exports = router;
