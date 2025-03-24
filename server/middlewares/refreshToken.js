const jwt = require('jsonwebtoken');

const refreshToken = (req, res) => {
    const token = req.cookies.refreshToken;

    if (!token) {
        return res.status(403).json({ message: 'Refresh Token is required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
        
        // Generate a new Access Token
        const newAccessToken = jwt.sign(
            { email: decoded.email, _id: decoded._id },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        res.status(200).json({ accessToken: newAccessToken });
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired refresh token' });
    }
};

module.exports = refreshToken;
