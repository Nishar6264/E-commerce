const { QueryTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailvalidator = require("email-validator");
const sequelize = require("../utils/sequelize");

exports.registerUser = async (req, res) => {
  const { Username, FirstName, LastName, Email, Password, Role, MobileNo } = req.body;

  // Check if the file is uploaded
  let UserProfile = null;
  if (req.file) {
    UserProfile = req.file.filename;
  }

  // if (
  //   !Username || !FirstName || !LastName || !Email || !Password || !Role || !MobileNo || !UserProfile
  // ) {
  //   return res.status(400).json({ message: "All fields are required" });
  // }

  try {
    if (!emailvalidator.validate(Email)) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    if (Password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters" });
    }

    // Checking if the user already exists
    const getUsers = await sequelize.query(
      `SELECT * FROM users WHERE Email = '${Email}' AND Role = '${Role}`,
      { type: QueryTypes.SELECT }
    );

    if (getUsers.length) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hashing the Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);



    await sequelize.query(
      `INSERT INTO users (Username, FirstName, LastName, Email, Password, Role, MobileNo, UserProfile) VALUES ( '${Username}','${FirstName}', '${LastName}', '${Email}', '${hashedPassword}', '${Role}', '${MobileNo}', '${UserProfile}')`,
      { type: QueryTypes.INSERT }
    );


    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  try {
    // Checking if the user exists
    const getUser = await sequelize.query(
      `SELECT * FROM users WHERE Email = :Email`,
      {
        replacements: { Email },
        type: QueryTypes.SELECT,
      }
    );

    // Checking if the user exists
    if (!getUser.length) {
      return res.status(400).json({ message: "wrong Email" });
    }

    // Getting the hashed Password from the database
    const hashedPassword = getUser[0].Password;

    // Comparing the Password
    const validPassword = await bcrypt.compare(Password, hashedPassword);

    if (!validPassword) {
      return res.status(400).json({ message: "wrong Password" });
    } else {
      return jwt.sign(
        {
          Username: getUser[0].Username,
          Email: getUser[0].Email,
          FirstName: getUser[0].FirstName,
          LastName: getUser[0].LastName,
          UserProfile: getUser[0].UserProfile,
          Role: getUser[0].Role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) {
            return res.status(500).json({ message: err.message });
          }
          return res.status(200).json({ message: "success", token });
        }
      );
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  // Get the UserID and Role from the request object
  const { UserID } = req.user;

  try {
    const [user] = await sequelize.query(
      `SELECT * FROM users WHERE UserID = :UserID`,
      {
        replacements: { UserID },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    //Check if the user is not an admin and the product was not created by the user
    if (Role !== "admin" && user.UserID !== UserID) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    //Delete the product
    await sequelize.query(`DELETE FROM users WHERE UserID = :UserID`, {
      replacements: { UserID },
      type: sequelize.QueryTypes.DELETE,
    });

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};