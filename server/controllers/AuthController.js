const UserModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,  // Your email
        pass: process.env.EMAIL_PASS   // Your email password or app password
    }
});

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: "User already exists",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword, isVerified: false });
        await newUser.save();

        // Generate Email Verification Token
        const emailToken = jwt.sign(
            { email: newUser.email },
            process.env.EMAIL_SECRET,
            { expiresIn: "1d" }
        );

        // Send Email Verification Link
        const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${emailToken}`;
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify Your Email",
            html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`
        });

        res.status(201).json({
            message: "Signup successful! Please check your email to verify your account.",
            success: true
        });

    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({
            message: "Internal server error",
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

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;
        if (!token) {
            return res.status(400).json({ message: "Verification token is required" });
        }

        const decoded = jwt.verify(token, process.env.EMAIL_SECRET);
        const user = await UserModel.findOne({ email: decoded.email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: "Email already verified" });
        }

        user.isVerified = true;
        await user.save();

        res.status(200).json({ message: "Email successfully verified!" });

    } catch (error) {
        console.error("Error verifying email:", error);
        res.status(500).json({ message: "Invalid or expired token" });
    }
};

const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const resetToken = jwt.sign(
            { email: user.email },
            process.env.PASSWORD_RESET_SECRET,
            { expiresIn: "1h" } // Link expires in 1 hour
        );

        const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
        
        // Send Reset Email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Reset Your Password",
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
        });

        res.status(200).json({
            message: "Password reset link sent to your email",
            success: true
        });

    } catch (error) {
        console.error("Error requesting password reset:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};
const resetPassword = async (req, res) => {
    try {
        const { token } = req.query;
        const { newPassword } = req.body;

        if (!token) {
            return res.status(400).json({ message: "Reset token is required", success: false });
        }

        const decoded = jwt.verify(token, process.env.PASSWORD_RESET_SECRET);
        const user = await UserModel.findOne({ email: decoded.email });

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({ message: "Password reset successful!", success: true });

    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ message: "Invalid or expired token", success: false });
    }
};



module.exports = { signup, login, signout, verifyEmail,  requestPasswordReset, resetPassword };
