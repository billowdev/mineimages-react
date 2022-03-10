module.exports = (sequelize, DataTypes) => {
  const OrderDetails = sequelize.define("OrderDetails", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV1,
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
	// status order
    state: {
      type: DataTypes.ENUM(["complete", "incomplete"]),
      allowNull: false,
      defaultValue: "incomplete",
    },
  });

  OrderDetails.associate = (models) => {
	// Order image by customer
    OrderDetails.hasMany(models.Orders, {
      onDelete: "cascade",
    });
	// Customer
    OrderDetails.hasOne(models.Users, {
      onDelete: "cascade",
    });

  };

  return OrderDetails;
};
