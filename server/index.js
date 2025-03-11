const express = require('express');
const app= express();
require('dotenv').config()

const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI).then(() => {
    console.log('Connected to MongoDB...');
}).catch((err) => {
    console.log(err);
});

const PORT= process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log("Server running on PORT 5000")
})