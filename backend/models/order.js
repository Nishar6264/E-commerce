"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {

    static associate({ User }) {
      // define association here
      Orders.belongsTo(User, { foreignKey: "idUser" });
    }
  }
  Orders.init(
    {
      idUser: DataTypes.INTEGER,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      cart: DataTypes.INTEGER,
      fullname: DataTypes.STRING,
      total: DataTypes.STRING,
      productName:DataTypes.STRING,
      status: {
        type: DataTypes.TINYINT,
        defaultValue: false,
      },
      delivery: {
        type: DataTypes.TINYINT,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Orders",
    }
  );
  // Orders.sync({ alter: true });
  return Orders;
};
