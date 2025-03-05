
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"username is required"],
        unique: [true,"username is already exist"],
        trim: true
    },
    email: {
        type: String,
        required: [true,"username is required"],
        unique: [true,"username is already exist"],
        trim: true
    },
    password: {
        type: String
    }
})

module.exports = mongoose.model("user",userSchema)