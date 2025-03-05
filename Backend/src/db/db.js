
const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0/code-reviewer")
.then(()=>{
    console.log("db connected");
})
.catch(()=>{
    console.log("db not connected");
})