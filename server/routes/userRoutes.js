const express = require("express");
const fileHandleMiddleware = require("../middleware/fileUpload");
const registerUser = require("../controllers/Users/registerUser")
const loginUser = require("../controllers/Users/loginUser")
const logoutUser = require("../controllers/Users/logoutUser")

const authMiddleware = require("../middleware/auth");


const userRoutes = express.Router();

// Register User
userRoutes.post(
  "/register/user",
  fileHandleMiddleware.single("profilePic"),
  registerUser
);

// Login User
userRoutes.post("/login/user", loginUser);

userRoutes.delete("/delete/user/:id", authMiddleware, logoutUser);

// Get User Profile
userRoutes.get("/profile/user", authMiddleware, (req, res) => {
  res.status(200).json({ message: "success", user: req.user });
});

module.exports = userRoutes;
