const { QueryTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

exports.createBrand = async (req, res) => {
  const { BrandName } = req.body;
  console.log(BrandName);

  const createdBy = req.user.UserID;

  if (!BrandName) {
    return res.status(400).json({ message: "BrandName is required" });
  }

  try {
    const brandExists = await sequelize.query(
      `SELECT BrandName FROM brands WHERE BrandName = :BrandName AND createdBy = :createdBy`,
      {
        replacements: { BrandName, createdBy },
        type: QueryTypes.SELECT,
      }
    );

    if (brandExists.length) {
      return res.status(400).json({ message: "brand already exists" });
    }

    await sequelize.query(
      "INSERT INTO brands (BrandName, createdBy) VALUES (:BrandName, :createdBy)",
      {
        replacements: { BrandName, createdBy },
        type: QueryTypes.INSERT,
      }
    );

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getbrandByUser = async (req, res) => {
  const createdBy = req.user.UserID;
  const userRole = req.user.Role;
  let brandResult;

  try {
    if (userRole === "admin") {
      brandResult = await sequelize.query(`SELECT * FROM brands`, {
        type: QueryTypes.SELECT,
      });
    } else {
      brandResult = await sequelize.query(
        `SELECT * FROM brands WHERE createdBy = :createdBy`,
        {
          replacements: { createdBy },
          type: QueryTypes.SELECT,
        }
      );
    }

    if (!brandResult.length) {
      return res.status(404).json({ message: "No brands found" });
    }

    return res
      .status(200)
      .json({ message: "success", brands: brandResult });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.updatebrand = async (req, res) => {
  //Get the BrandName from the request
  const { BrandName } = req.body;

  //Get the BrandID from the request
  const { BrandID } = req.params;

  //Get the UserID from the request
  const createdBy = req.user.UserID;

  //Get the role of the user from  the request
  const userRole = req.user.Role;

  if (!BrandName) {
    return res.status(400).json({ message: "BrandName is required" });
  }

  try {
    const brand = await sequelize.query(
      `SELECT * FROM brands WHERE BrandID = :BrandID`,
      {
        replacements: { BrandID },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (brand.length === 0) {
      return res.status(404).json({ message: "brand not found" });
    }

    if (userRole !== "admin" && brand[0].createdBy !== createdBy) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    await sequelize.query(
      `UPDATE brands SET BrandName = :BrandName WHERE BrandID = :BrandID`,
      {
        replacements: { BrandName, BrandID },
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deletebrand = async (req, res) => {
  //Get the BrandID from the params
  const { BrandID } = req.params;

  //Get the UserID from the request
  const createdBy = req.user.UserID;

  //Get the role of the user from  the request
  const userRole = req.user.Role;

  try {
    const brand = await sequelize.query(
      `SELECT * FROM brands WHERE BrandID = :BrandID`,
      {
        replacements: { BrandID },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (brand.length === 0) {
      return res.status(404).json({ message: "brand not found" });
    }

    //Check if the user is not an admin and the brand was not created by the user
    if (userRole !== "admin" && brand[0].createdBy !== createdBy) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    //Delete the brand
    await sequelize.query(
      `DELETE FROM brands WHERE BrandID = :BrandID`,
      {
        replacements: { BrandID },
        type: sequelize.QueryTypes.DELETE,
      }
    );

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

