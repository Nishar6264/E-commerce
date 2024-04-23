const { getCartByUser } = require("../../controllers/carts");
const express = require("express");
const { authenticate } = require("../../middleware/auth");
const { sendMail } = require("../../mailer.js");
const nodeMailer = require("nodemailer");

const emailRouter = express.Router();

emailRouter.post("/", [authenticate], async (req, res) => {
  const { fullName, email, phone, address } = req.body;

  const user = req.user;

  const subject = "Order Details";
  const status = false;

  const cartsUser = await getCartByUser(user.id);

  const total = cartsUser.reduce((total, item) => {
    return total + parseInt(item.priceProduct) * parseInt(item.count);
  }, 0);

  const htmlHead = `<table style="width:50%">
    <tr style="border: 1px solid black;"><th style="border: 1px solid black;">Product Name</th><th style="border: 1px solid black;">Image</th><th style="border: 1px solid black;">prices</th><th style="border: 1px solid black;">Quantity</th><th style="border: 1px solid black;">Total Prices</th>`;

  let htmlContent = "";

  for (let i = 0; i < cartsUser.length; i++) {
    htmlContent += `<tr>
      <td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">${
        cartsUser[i].nameProduct
      }</td>
      <td style="border: 1px solid black; font-size: 1.2rem; text-align: center;"><img src=${
        cartsUser[i].img1
      }width="80" height="80"></td>
      <td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">${
        cartsUser[i].priceProduct
      }$</td>
      <td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">${
        cartsUser[i].count
      }</td>
      <td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">
      ${parseInt(cartsUser[i].priceProduct) * parseInt(cartsUser[i].count)}
      $</td><tr>`;
  }
  const htmlResult = `
  <h1>Hi, ${fullName}</h1>
  <h2>Thank you for your order! You made a great choice! </h2>
  <h3>Phone: ${phone}</h3>
  <h3>Address: ${address}</h3>
    ${htmlHead}
    ${htmlContent}
  <h1>Total: ${total}$
  <p>Thank You!</p>
    `;

  const info = await sendMail(email, subject, htmlResult);

  res.status(200).send({ sendEmail: nodeMailer.getTestMessageUrl(info) });
});

module.exports = emailRouter;
