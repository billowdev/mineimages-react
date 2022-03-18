const transactionIsExist = await Transactions.findOne({
      where: { UserId: UserId, status: "pending" },
    });

    if (transactionIsExist) {
      const orderIsExist = await Orders.findOne({
        where: {
          ImageId: ImageId,
          UserId: UserId,
          TransactionId: transactionIsExist.id,
          status: "oncart",
        },
      });

      if (!orderIsExist) {
        Orders.create({
          ImageId: ImageId,
          TransactionId: transactionIsExist.id,
          UserId: UserId,
        })
          .then((response) => {
            res.json({ header: "create order successfully", data: response });
          })
          .catch((err) => {
            if (err) {
              res.status(400).json({ error: err });
            }
          });
      } else {
        res.json("this image has already oncart ");
      }
    } else {
      // console.log("\n this is false status \n");
      Transactions.create({ UserId: UserId }).then((transaction) => {
        Orders.create({
          ImageId: ImageId,
          TransactionId: transaction.id,
          UserId: UserId,
        }).then(() => {
          res.json("create order successfully");
        });
      });
    }
  }