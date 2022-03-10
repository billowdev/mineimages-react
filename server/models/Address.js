module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define("Address", {
    addressLine1: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    addressLine2: {
      type: DataTypes.STRING(100),
    },
    city: {
      type: DataTypes.STRING(50),
    },
    postalCode: {
      type: DataTypes.STRING(10),
    },
    country: {
      type: DataTypes.STRING(50),
    }
  });

  Address.associate = (models) => {
    Address.hasMany(models.Users, {
      onDelete: "cascade",
    });
  };

  return Address;
};
