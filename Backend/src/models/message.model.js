
const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true,"text is required"]
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "project"
    }
})

module.exports = mongoose.model("message",messageSchema)
