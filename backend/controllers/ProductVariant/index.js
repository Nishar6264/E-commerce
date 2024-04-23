const { productVariant } = require("../../models");
const { Op } = require("sequelize");

const getProductVairantById = async (ProductID) => {
  try {
    const productvari = await productVariant.findAll({
      where: {
        [Op.and]: [{ ProductID }],
      },
    });
    return productvari;
  } catch (err) {
    console.log(err);
  }
};

const createProductVariant = async (data) => {
  try {
    const newProductVariant = await productVariant.create(data);
    return newProductVariant;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getProductVairantById,
  createProductVariant,
};
