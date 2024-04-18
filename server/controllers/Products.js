const { QueryTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

exports.createProduct = async (req, res) => {
  try {
    //	ProductID	Name	Thumbnail	Description	CategoryID	BrandID	CreatedBy	

    const { ProductName, Description, CategoryName } = req.body;
//    const { ProductName, Description, CategoryName } = req.body;
    const CreatedBy = req.user.UserID;
    const Thumbnail = req.files
      ? req.files.map((file) => file.filename)
      : null;

    // Validate required fields
    if (
      !ProductName ||
      !Description ||
      !CreatedBy ||
      !Thumbnail
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find or create category
    const [category] = await sequelize.query(
      `SELECT CategoryID FROM categories WHERECategoryName = :CategoryName AND CreatedBy = :CreatedBy`,
      {
        replacements: {CategoryName, CreatedBy },
        type: QueryTypes.SELECT,
      }
    );

    let CategoryID = category?.CategoryID;

    if (!CategoryID) {
      // Create new category if not found
      await sequelize.query(
        `INSERT INTO categories (CategoryName, CreatedBy) VALUES (:CategoryName, :CreatedBy)`,
        {
          replacements: {CategoryName, CreatedBy },
          type: QueryTypes.INSERT,
        }
      );

      const [category] = await sequelize.query(
        `SELECT CategoryID FROM categories WHERECategoryName = :CategoryName AND CreatedBy = :CreatedBy`,
        {
          replacements: {CategoryName, CreatedBy },
          type: QueryTypes.SELECT,
        }
      );

      CategoryID = category?.CategoryID;
      console.log(CategoryID);
    }

    // Create product
    await sequelize.query(
      `INSERT INTO products (ProductName, Description,  CategoryID, CreatedBy, Thumbnail) VALUES (:ProductName, :Description, : :CategoryID, :CreatedBy, :Thumbnail)`,
      {
        replacements: {
          ProductName,
          Description,
          
          CategoryID,
          CreatedBy,
          Thumbnail: JSON.stringify(Thumbnail),
        },
        type: QueryTypes.INSERT,
      }
    );

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getProductsByuser = async (req, res) => {
  const CreatedBy = req.user.UserID;
  const userRole = req.user.Role;
  let productResult;

  try {
    if (userRole === "admin") {
      productResult = await sequelize.query(
        `SELECT p.ProductID, p.ProductName, p.Description, p. p.Thumbnail, c.CategoryName FROM products AS p LEFT JOIN categories AS c ON p.CategoryID = c.CategoryID`,
        {
          type: QueryTypes.SELECT,
        }
      );
    } else {
      productResult = await sequelize.query(
        `SELECT p.ProductID, p.ProductName, p.Description, p. p.Thumbnail, c.CategoryName FROM products AS p LEFT JOIN categories AS c ON p.CategoryID = c.CategoryID WHERE p.CreatedBy = :CreatedBy`,
        {
          replacements: { CreatedBy },
          type: QueryTypes.SELECT,
        }
      );
    }

    if (!productResult.length) {
      return res.status(404).json({ message: "No products found" });
    }

    return res
      .status(200)
      .json({ message: "success", products: productResult });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  //Get the product details from the request
  const { ProductName, Description, CategoryName } = req.body;

  // Get product images from the request
  const Thumbnail = req.files
    ? req.files.map((file) => file.filename)
    : null;

  //Get the ProductID from the request
  const { ProductID } = req.params;

  //Get the UserID from the request
  const CreatedBy = req.user.UserID;

  console.log("CreatedBy", CreatedBy);

  //Get the role of the user from  the request
  const userRole = req.user.Role;

  if (!ProductName || !Description || !CategoryName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [product] = await sequelize.query(
      `SELECT * FROM products WHERE ProductID = :ProductID`,
      {
        replacements: { ProductID },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    console.log("product", product);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (userRole !== "admin" && product.CreatedBy !== CreatedBy) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    // Find or create category
    const [category] = await sequelize.query(
      `SELECT CategoryID FROM categories WHERE CategoryName = :CategoryName AND CreatedBy = :CreatedBy`,
      {
        replacements: {CategoryName, CreatedBy },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    let CategoryID = category?.CategoryID;

    // Create new category if not found
    if (!CategoryID) {
      const [newCategory] = await sequelize.query(
        `INSERT INTO categories (CategoryName, CreatedBy) VALUES (:CategoryName, :CreatedBy) RETURNING CategoryID`,
        {
          replacements: {CategoryName, CreatedBy },
          type: sequelize.QueryTypes.INSERT,
        }
      );
      CategoryID = newCategory?.CategoryID;
    }

    // Update product
    await sequelize.query(
      `UPDATE products SET ProductName = :ProductName, Description = :Description, productPrice = : Thumbnail = :Thumbnail WHERE ProductID = :ProductID`,
      {
        replacements: {
          ProductName,
          Description,
          
          Thumbnail: JSON.stringify(Thumbnail),
          ProductID,
        },
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.searchProduct = async (req, res) => {
  // Get the search query from req.params
  const searchQuery = req.query.search;
  const CreatedBy = req.user.UserID;
  const userRole = req.user.Role;
  let productResult = [];

  try {
    if (userRole === "admin") {
      productResult = await sequelize.query(
        `SELECT DISTINCT p.ProductID, p.ProductName, p.Description, p. p.Thumbnail, c.CategoryName FROM products AS p LEFT JOIN categories AS c ON p.CategoryID = c.CategoryID WHERE LOWER(p.ProductName) LIKE :searchQuery OR LOWER(p.Description) LIKE :searchQuery`,
        {
          replacements: { searchQuery: `%${searchQuery}%` },
          type: QueryTypes.SELECT,
        }
      );
    } else {
      productResult = await sequelize.query(
        `SELECT DISTINCT p.ProductID, p.ProductName, p.Description, p. p.Thumbnail, c.CategoryName FROM products AS p LEFT JOIN categories AS c ON p.CategoryID = c.CategoryID WHERE (LOWER(p.ProductName) LIKE :searchQuery OR LOWER(p.Description) LIKE :searchQuery) AND p.CreatedBy = :CreatedBy`,
        {
          replacements: { searchQuery: `%${searchQuery}%`, CreatedBy },
          type: QueryTypes.SELECT,
        }
      );
    }

    if (productResult.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res
      .status(200)
      .json({ message: "success", products: productResult });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  //Get the ProductID from the params
  const { ProductID } = req.params;

  //Get the UserID from the request
  const CreatedBy = req.user.UserID;

  //Get the role of the user from  the request
  const userRole = req.user.Role;

  try {
    const product = await sequelize.query(
      `SELECT * FROM products WHERE ProductID = :ProductID`,
      {
        replacements: { ProductID },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (product.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    //Check if the user is not an admin and the product was not created by the user
    if (userRole !== "admin" && product[0].CreatedBy !== CreatedBy) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    //Delete the product
    await sequelize.query(`DELETE FROM products WHERE ProductID = :ProductID`, {
      replacements: { ProductID },
      type: sequelize.QueryTypes.DELETE,
    });

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
