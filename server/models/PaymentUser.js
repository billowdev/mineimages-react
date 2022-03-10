module.exports = (sequelize, DataTypes) => {
	const PaymentUser = sequelize.define("PaymentUser", {
	  PaymentUserType: {
		type: DataTypes.STRING(70),
		allowNull: false,
	  },
	  provider: {
		type: DataTypes.STRING(100),
		allowNull: false,
	  },
	  accountNumber: {
		type: DataTypes.STRING(100),
		allowNull: false,
	  },
	  expiry: {
		type: DataTypes.STRING(20),
	  },

	});
  
	PaymentUser.associate = (models) => {
	  PaymentUser.hasOne(models.Users, {
		onDelete: "cascade",
	  });
	};
	return PaymentUser;
  };
  