const { signupValidation } = require('../middlewares/AuthValidation');

const  router = require('express').Router();

router.post("/login", (req, res)=>{
    res.send('Login successful')
})

router.post("/signup", signupValidation, signup)
module.exports= router