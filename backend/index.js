const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { sequelize } = require("./models");
const rootRouter = require("./routers");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
const httpServer = require("http").createServer(app);

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);



const publicPathDirectory = path.join(__dirname, "public");
app.use(express.static(publicPathDirectory));

app.use(cookieParser());
app.use(express.json());
app.use("/api/v1", rootRouter);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully");
  })
  .catch((err) => {
    console.log("Unable to connect to the database", err);
  });

const PORT = process.env.PORT || 8000;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
