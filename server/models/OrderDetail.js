module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define("OrderDetail", {
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
      type: DataTypes.ENUM(["complete", "incomeplete"]),
      allowNull: false,
      defaultValue: "incomplete",
    },
  });

  OrderDetail.associate = (models) => {
	// Order image by customer
    OrderDetail.hasMany(models.Orders, {
      onDelete: "cascade",
    });
	// Customer
    OrderDetail.hasOne(models.Users, {
      onDelete: "cascade",
    });
  };

  return OrderDetail;
};
