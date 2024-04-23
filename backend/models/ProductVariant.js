

"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class ProductVariant extends Model {
    static associate({ Product }) {
      // Define association here
      ProductVariant.belongsTo(Product, {
        foreignKey: "productID",
        as: "product",
      });
    }
  }
  ProductVariant.init(
    {
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Product", 
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "ProductVariant",
      timestamps: false, 
    }
  );

  return ProductVariant;
};
