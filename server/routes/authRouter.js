const { signupValidation, loginValidation } = require('../middlewares/AuthValidation');
const { signup, login, signout } = require('../controllers/AuthController');
const router = require('express').Router();
const verifyToken = require('../utils/verifyUser.js'); 


router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.post('/signout', verifyToken, signout);

module.exports = router;
