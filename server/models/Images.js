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
    visible: {
      type: DataTypes.ENUM(["public", "private"]),
      allowNull: false,
      defaultValue: "private",
    },
    status: {
      type: DataTypes.ENUM(["active", "inactive"]),
      allowNull: false,
      defaultValue: "inactive",
    },
    remove: {
      type: DataTypes.ENUM(["YES","NO"]),
      allowNull: false,
      defaultValue: "NO"
    }
  });

  Images.associate = (models) => {
    // Images.belongsToMany(models.Users, {
    //   through: models.Orders,
    //   foreignKey: "ImageId",
    //   otherKey: "UserId",
    // });

    Images.hasMany(models.Categories, {
      onDelete: "cascade"
    })
    
    Images.hasMany(models.Orders, {
      onDelete: "cascade"
    })
  };
  return Images;
};
