const express = require("express");
const userRouter = require("./users");
const productRouter = require("./products");
const cartRouter = require("./carts");
const emailRouter = require("./emails");
const orderRouter = require("./order");


const rootRouter = express.Router();

rootRouter.use("/users", userRouter);
rootRouter.use("/products", productRouter);
rootRouter.use("/carts", cartRouter);
rootRouter.use("/emails", emailRouter);
rootRouter.use("/order", orderRouter);


module.exports = rootRouter;
