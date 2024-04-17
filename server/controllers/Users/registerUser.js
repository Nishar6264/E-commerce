const express = require('express');
const Sequelize = require('sequelize');

const registerUser = async (req, res) => {

    const { Username, FirstName, LastName, Email, Password, Role } = req.body;
    let UserProfile = null;
    if (req.file) {
        UserProfile = req.file.filename;
    }
    if (
        !Username ||
        !FirstName ||
        !LastName ||
        !Email ||
        !Password ||
        !Role ||
        !UserProfile
    ) {
        return res.status(400).json({ message: "All fields are required" });
    }
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
            `SELECT * FROM users WHERE Email = '${Email}'`,
            { type: QueryTypes.SELECT }
        );

        if (getUsers.length) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hashing the Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        const roleName = "user";
        // Inserting data into the users database

        await sequelize.query(
            `INSERT INTO users ( Username, FirstName, LastName, Email, Password, Role, UserProfile) VALUES ('${Username}', '${FirstName}', '${LastName}', '${Email}', '${hashedPassword}', '${Role}', '${UserProfile}')`,
            { type: QueryTypes.INSERT }
        );

        const getUser = await sequelize.query(
            `SELECT userId FROM users WHERE Email = '${Email}'`,
            {
                type: QueryTypes.SELECT,
            }
        );

        const userId = getUser[0].userId;

        await sequelize.query(
            `INSERT INTO roles (roleName, userId) VALUES ('${roleName}', '${userId}')`,
            { type: QueryTypes.INSERT }
        );

        return res.status(200).json({ message: "success" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.module = registerUser;
// Routes
// Register


// Login
app.post('/login', async (req, res) => {
    try {
        const { Email, Password } = req.body;
        const query = `SELECT * FROM Users WHERE Email = ? AND Password = ?`;
        const [users, metadata] = await sequelize.query(query, { replacements: [Email, Password], type: Sequelize.QueryTypes.SELECT });
        if (users.length === 0) {
            throw new Error('Invalid email or Password');
        }
        res.status(200).json(users[0]);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// Logout (Not really needed in this setup, but included for completeness)
app.get('/logout', (req, res) => {
    res.status(200).send('Logged out successfully');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
