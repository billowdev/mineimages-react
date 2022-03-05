module.exports = (sequelize, DataTypes) => {
  const Images = sequelize.define("Images", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    pathOrigin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pathWatermark: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
    categories: {
      type: DataTypes.ENUM([
        "General",
        "Computer",
        "Love",
        "Flower",
        "Beach",
        "Wallpaper",
        "Nature",
        "People",
        "Business",
        "Food",
        "Office",
        "Happy",
        "Woman",
        "Man",
        "Girl",
        "Boy",
        "City",
        "Coffee",
        "Family",
        "Animal",
        "Book",
        "Fashion",
        "Sport",
        "Music",
        "Money",
        "School",
        "House",
        "Water",
        "Work",
        "Art",
      ]),
      defaultValue: "General",
    },
    visible: {
      type: DataTypes.ENUM(["public", "private"]),
      allowNull: false,
      defaultValue: "public",
    },
    status: {
      type: DataTypes.ENUM(["active", "inactive"]),
      allowNull: false,
      defaultValue: "active",
    },
  });

  Images.associate = (models) => {
    Images.belongsToMany(models.Users, {
      through: models.Orders,
      foreignKey: "ImageId",
      otherKey: "UserId",
    });
  };
  return Images;
};
