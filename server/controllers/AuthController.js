const UserModel = require("../models/user.model.js");
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: 'User already exists',
                success: false
            });
        }

        const newUser = new UserModel({ name, email, password });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();

        res.status(201).json({
            message: 'Signup Successfully',
            success: true
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

module.exports = { signup };
