const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName : {
        type : String
    },
        profile: {
            firstName : {
                type : String,
            },
            lastName : {
                type : String,
            },
            age : {
                type : Number
            },
        },
});

module.exports = mongoose.model("User",userSchema);