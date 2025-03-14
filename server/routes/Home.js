const ensureAuthenticated = require('../middlewares/Auth');
const router = require('express').Router();

router.get('/', ensureAuthenticated, (req, res) => {
    console.log('---- logged in user detail ---', req.user);
    // Assuming req.user.name holds the user's name. Adjust if needed.
    const userName = req.user.name || 'User';
    res.status(200).json({
        message: `Welcome to AuthBase`
    });
});

module.exports = router;
