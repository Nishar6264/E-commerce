const express = require("express");
const {
  getOrders,
  createOrders,
  getListOrders,
} = require("../../controllers/order");
const { getCartByUser } = require("../../controllers/carts");
const orderRouter = express.Router();





orderRouter.get("/", async (req, res) => {
  const { idUser } = req.query;

  if (idUser) {
    const user = await getOrders(idUser);
    if (!user) {
      return res.status(500).send("Can't get user Orders");
    }
    res.status(200).send(user);
  } else {
    const listOrders = await getListOrders();
    if (!listOrders) {
      return res.status(500).send("Can't get list Orders");
    }

    res.status(200).send(listOrders);
  }
});



orderRouter.post("/", async (req, res) => {
  const { idUser, phone, address, cart, productName,
    fullname, total } = req.body;

  const Orders = await createOrders({
    idUser,
    phone,
    address,
    productName,
    cart,
    fullname,
    total,
  });
  console.log(Orders)
  if (!Orders) {
    return res.status(500).send("Can't create Orders");
  }

  res.status(200).send(Orders);
});

// orderRouter.get("/", async (req, res) => {
//   const listOrders = await getListOrders();

//   if (!listOrders) {
//     return res.status(500).send("Can't get list Orders");
//   }

//   res.status(200).send(listOrders);
// });
module.exports = orderRouter;
