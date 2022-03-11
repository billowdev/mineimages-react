module.exports = (sequelize, DataTypes) => {
  const Transactions = sequelize.define("Transactions", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV1,
    },
    state: {
      type: DataTypes.ENUM(["complete", "pending", "oncart"]),
      allowNull: false,
      defaultValue: "oncart",
    },
  });

  Transactions.associate = (models) => {
    Transactions.hasMany(models.Orders, {
      onDelete: "cascade"
    });

    Transactions.belongsTo(models.Users, { foreignKey: "UserId" });
  };

  return Transactions;
};
