const { QueryTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

exports.createCategory = async (req, res) => {
  const { UserID,CategoryName } = req.body;
  console.log(CategoryName);

  const CreatedBy = req.user.UserID;

  if (!CategoryName) {
    return res.status(400).json({ message: "CategoryName is required" });
  }

  try {
    const categoryExists = await sequelize.query(
      `SELECT CategoryName FROM categories WHERE CategoryName = :CategoryName AND CreatedBy = :CreatedBy`,
      {
        replacements: { CategoryName, CreatedBy },
        type: QueryTypes.SELECT,
      }
    );

    if (categoryExists.length) {
      return res.status(400).json({ message: "category already exists" });
    }

    await sequelize.query(
      "INSERT INTO categories (CategoryName, CreatedBy) VALUES (:CategoryName, :CreatedBy)",
      {
        replacements: { CategoryName, CreatedBy },
        type: QueryTypes.INSERT,
      }
    );

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getCategoryByUser = async (req, res) => {
  const CreatedBy = req.user.UserID;
  const userRole = req.user.Role;
  let categoryResult;

  try {
    if (userRole === "admin") {
      categoryResult = await sequelize.query(`SELECT * FROM categories`, {
        type: QueryTypes.SELECT,
      });
    } else {
      categoryResult = await sequelize.query(
        `SELECT * FROM categories WHERE CreatedBy = :CreatedBy`,
        {
          replacements: { CreatedBy },
          type: QueryTypes.SELECT,
        }
      );
    }

    if (!categoryResult.length) {
      return res.status(404).json({ message: "No categories found" });
    }

    return res
      .status(200)
      .json({ message: "success", categories: categoryResult });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.updateCategory = async (req, res) => {
  //Get the CategoryName from the request
  const { CategoryName } = req.body;

  //Get the CategoryID from the request
  const { CategoryID } = req.params;

  //Get the UserID from the request
  const CreatedBy = req.user.UserID;

  //Get the role of the user from  the request
  const userRole = req.user.Role;

  if (!CategoryName) {
    return res.status(400).json({ message: "CategoryName is required" });
  }

  try {
    const category = await sequelize.query(
      `SELECT * FROM categories WHERE CategoryID = :CategoryID`,
      {
        replacements: { CategoryID },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (category.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (userRole !== "admin" && category[0].CreatedBy !== CreatedBy) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    await sequelize.query(
      `UPDATE categories SET CategoryName = :CategoryName WHERE CategoryID = :CategoryID`,
      {
        replacements: { CategoryName, CategoryID },
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  //Get the CategoryID from the params
  const { CategoryID } = req.params;

  //Get the UserID from the request
  const CreatedBy = req.user.UserID;

  //Get the role of the user from  the request
  const userRole = req.user.Role;

  try {
    const category = await sequelize.query(
      `SELECT * FROM categories WHERE CategoryID = :CategoryID`,
      {
        replacements: { CategoryID },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (category.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    //Check if the user is not an admin and the category was not created by the user
    if (userRole !== "admin" && category[0].CreatedBy !== CreatedBy) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    //Delete the category
    await sequelize.query(
      `DELETE FROM categories WHERE CategoryID = :CategoryID`,
      {
        replacements: { CategoryID },
        type: sequelize.QueryTypes.DELETE,
      }
    );

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

