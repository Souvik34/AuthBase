const { signupValidation, loginValidation } = require('../middlewares/AuthValidation');
const { signup, login, signout } = require('../controllers/AuthController');
const refreshToken = require('../middlewares/refreshToken');
const router = require('express').Router();
const verifyToken = require('../utils/verifyUser.js');
const { verifyEmail } = require('../controllers/AuthController');
const { requestPasswordReset, resetPassword } = require('../controllers/AuthController');
const passport = require("../Config/Passport.js");




router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.post('/signout', verifyToken, signout);
router.post('/refresh', refreshToken); 
router.get('/verify-email', verifyEmail);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

// Google OAuth
// router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// router.get(
//     "/google/callback",
//     passport.authenticate("google", { session: false }),
//     (req, res) => {
//         const { user, token } = req.user;
//         res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}&name=${user.name}&email=${user.email}`);
//     }
// );

// GitHub OAuth
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get(
    "/github/callback",
    passport.authenticate("github", { session: false }),
    (req, res) => {
        const { user, token } = req.user;
        res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}&name=${user.name}&email=${user.email}`);
    }
);
module.exports = router;
