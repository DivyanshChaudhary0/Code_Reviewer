
const express = require("express");
const app = express();
const projectRoutes = require("./routes/project.routes")
const cors = require("cors")

app.use(express.json({limit:"10mb"}))
app.use(express.urlencoded({extended:true,limit:"10mb"}))
app.use(cors())

app.use("/v1/api/projects", projectRoutes)

module.exports = app