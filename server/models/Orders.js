module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define("Orders", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    }
  });

  // this stack help me alot :)
  // https://stackoverflow.com/questions/41528676/sequelize-belongstomany-with-custom-join-table-primary-key

  Orders.associate = (models) => {
    Orders.belongsTo(models.Images, { foreignKey: "ImageId" });
    Orders.belongsTo(models.Transactions, { foreignKey: "TransactionId" });
  };
  return Orders;
};
