const express = require('express');
const app= express();

require('dotenv').config()
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
const cors  = require('cors')


mongoose.connect(MONGODB_URI).then(() => {
    console.log('Connected to MongoDB...');
}).catch((err) => {
    console.log(err);
});

const PORT= process.env.PORT || 5000;


app.use(bodyParser.json())
app.use(cors())

const AuthRouter = require('./routes/authRouter')
const Home = require('./routes/Home')
app.use('/api/v1/auth', AuthRouter)
app.use('/home', Home);
app.listen(PORT, ()=>{
    console.log(`Server running on PORT ${PORT}`)
})