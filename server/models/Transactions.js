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
	  }
	});
  
	// this stack help me alot :)
	// https://stackoverflow.com/questions/41528676/sequelize-belongstomany-with-custom-join-table-primary-key
  
	Transactions.associate = (models) => {
		Transactions.hasMany(models.Orders, {
			onDelete: "cascade"
		})

	};

	
	return Transactions;
  };
  