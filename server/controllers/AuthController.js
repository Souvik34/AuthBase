const UserModel = require("../models/user.model.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
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

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json({
                message: 'Auth Failed',
                success: false
            });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({
                message: 'Password does not match!',
                success: false
            });
        }

        // Generate Access Token (Short-lived)
        const accessToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        // Generate Refresh Token (Long-lived)
        const refreshToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.REFRESH_SECRET,
            { expiresIn: '7d' }
        );

        // Store Refresh Token in HTTP-only cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({
            message: 'Login Successfully',
            success: true,
            accessToken, // Sent to frontend
            name: user.name,
            email
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};


const signout = async (req, res) => {
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict"
        });

        res.status(200).json({
            success: true,
            message: "User logged out successfully!"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


module.exports = { signup, login, signout};
