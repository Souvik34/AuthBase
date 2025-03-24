const { signupValidation, loginValidation } = require('../middlewares/AuthValidation');
const { signup, login, signout } = require('../controllers/AuthController');
const refreshToken = require('../middlewares/refreshToken');
const router = require('express').Router();
const verifyToken = require('../utils/verifyUser.js');

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.post('/signout', verifyToken, signout);
router.post('/refresh', refreshToken); 

module.exports = router;
