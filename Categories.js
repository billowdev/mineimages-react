module.exports = (sequelize, DataTypes) => {
	const Categories = sequelize.define("Categories", {
	  id: {
		type: DataTypes.int,
		autoIncrement:true,
		primaryKey: true
	  },
	});
  
	// this stack help me alot :)
	// https://stackoverflow.com/questions/41528676/sequelize-belongstomany-with-custom-join-table-primary-key
  
	Categories.associate = (models) => {
	  Categories.belongsTo(models.Users, { foreignKey: "UserId" }, {})
	  Categories.belongsTo(models.Images, { foreignKey: "ImageId" })
	};
	return Categories;
  };
  