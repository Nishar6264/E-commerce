const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const adminEmail = process.env.EMAIL;
const adminPassword = process.env.PASSWORD;


const mailHost = "smtp.gmail.com";


const mailPort = 587;

const sendMail = async (to, subject, htmlContent) => {
  const transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false,
    auth: {
      user: adminEmail,
      pass: adminPassword,
    },
  });

  const info = await transporter.sendMail({
    from: adminEmail,
    to: to,
    subject: subject,
    html: htmlContent,
  });

  return info;
};

module.exports = {
  sendMail,
};
