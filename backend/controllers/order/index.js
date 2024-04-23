const { Orders, User } = require("../../models");

const getOrders = async (idUser) => {
  try {
    const OrdersUser = await Orders.findAll({
      where: {
        idUser,
      },
    });
    return OrdersUser;
  } catch (err) {
    console.log(err);
  }
};

const createOrders = async (data) => {
  try {
    const newOrders = await Orders.create(data);
    console.log(data)
    return newOrders;
  } catch (err) {
    console.log(err);
  }
};

const getListOrders = async () => {
  try {
    const listOrders = await Orders.findAll();
    return listOrders;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getOrders,
  createOrders,
  getListOrders,
};
