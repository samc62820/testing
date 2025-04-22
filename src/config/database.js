const mongoose = require('mongoose');

const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://testing:testing123@cluster0.sq79w6l.mongodb.net/testing")
};

module.exports = connectDB;
