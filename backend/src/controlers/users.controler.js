const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/users.model')

exports.addUser = (req, res) => {

    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, Email, and Password are required." })
    }

    Users.findByEmail(email, async (error, existingUsers) => {
        if (error) {
            return res.status(400).json({ message: "Database connection failed.", error })
        }

        if (existingUsers.length > 0) {
            return res.status(400).json({ message: "Email already exists. Try another one.", error })
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new Users({ name, email, password: hashedPassword, role });

            Users.addNewUser(user, (error, response) => {
                if (error) {
                    return res.status(400).json({ message: "Failed to register user.", error })
                }

                if (response.affectedRows > 0) {
                    res.status(201).json({ message: "Registered successfully." });
                } else {
                    res.status(500).json({ message: "User registration failed." });
                }
            })
        }
        catch (error) {
            return res.status(500).json({ message: "Failed to encrypt the password." })
        }

    })

}

exports.loginUser = (req, res) => {

    const { email, password } = req.body;

    Users.findByEmail(email, async (error, existingUsers) => {
        if (error) {
            return res.status(500).json({ message: "Database connection failed.", error })
        }

        if (existingUsers.length == 0) {
            return res.status(404).json({ message: "Email does not exist.", error })
        }

        try {
            const user = existingUsers[0];
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                const token = jwt.sign(
                    { id: user.id, name: user.name, role: user.role, email: user.email },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );
                res.status(200).json({ message: "Logged in successfully.", token });
            } else {
                return res.status(401).json({ message: "Incorrect password." })
            }

        } catch (error) {
            return res.status(500).json({ message: "Error while decrypting password.", error });
        }

    })
}