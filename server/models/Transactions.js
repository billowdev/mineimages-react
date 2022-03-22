module.exports = (sequelize, DataTypes) => {
  const Transactions = sequelize.define("Transactions", {
    autoId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV1,
    },
    status: {
      type: DataTypes.ENUM(["complete", "pending", "incomeplete"]),
      allowNull: false,
      defaultValue: "pending",
    },
  });

  Transactions.associate = (models) => {
    Transactions.hasMany(models.Orders, {
      onDelete: "cascade"
    });

    
  };

  return Transactions;
};
