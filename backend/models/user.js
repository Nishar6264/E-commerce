"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate({ Cart, Comment, Orders,  }) {
      User.hasOne(Cart, {
        foreignKey: "idUser",
        as: "cart",
      });

      User.hasOne(Orders, {
        foreignKey: "idUser",
        as: "orders",
      });
     
    }
  }
  User.init(
    {
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 6,
          max: 30,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          min: 10,
          max: 50,
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 6,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[0-9]+$/,
        },
      },
      admin: {
        type: DataTypes.STRING,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  // User.sync({ alter: true });
  return User;
};
