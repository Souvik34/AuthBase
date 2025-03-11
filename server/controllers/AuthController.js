const UserModel = require("../models/user.model");

const signup = async(req, res)=>
{
    try {
        const {name, email, password} = req.body;
        const user =await UserModel.findOne({email});
        
    } catch (error) {
        next(error)
    }
}