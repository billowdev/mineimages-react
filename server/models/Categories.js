module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define("Categories", {
    name: {
      type: DataTypes.STRING,
    },
    desc: {
      type: DataTypes.STRING,
    },
  });
  

  return Categories;
};
