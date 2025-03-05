
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true,"name is already taken"],
        required: [true,"name is required"],
    },
    code: {
        type: String,
        required: [true,"code is required"]
    }
},{timestamps:true})

module.exports = mongoose.model("project",projectSchema)