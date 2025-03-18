
const express = require("express");
const app = express();
const cors = require("cors")

app.use(express.json({limit:"10mb"}))
app.use(express.urlencoded({extended:true,limit:"10mb"}))

app.use(cors({ origin: '*', methods: '*' }));

const projectRoutes = require("./routes/project.routes")
const userRoutes = require("./routes/user.routes")
const messageRoutes = require("./routes/message.routes")

app.use("/v1/api/projects", projectRoutes)
app.use("/v1/api/users", userRoutes)
app.use("/v1/api/messages", messageRoutes)

module.exports = app
