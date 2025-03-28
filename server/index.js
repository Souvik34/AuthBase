const express = require('express');
const app= express();

require('dotenv').config()
console.log("EMAIL_SECRET:", process.env.EMAIL_SECRET); // Debugging line
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
const cors  = require('cors')
const passport = require('./Config/Passport');


mongoose.connect(MONGODB_URI).then(() => {
    console.log('Connected to MongoDB...');
}) .catch((err) => console.error('MongoDB Connection Error:', err));


const PORT= process.env.PORT || 5000;

const cookieParser = require("cookie-parser");

app.use(bodyParser.json());
app.use(cookieParser()); 
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
}));



const AuthRouter = require('./routes/authRouter')
const Home = require('./routes/Home')
app.use('/api/v1/auth', AuthRouter)
app.use('/api/home', Home);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});
app.use(passport.initialize());

app.listen(PORT, ()=>{
    console.log(`Server running on PORT ${PORT}`)
})