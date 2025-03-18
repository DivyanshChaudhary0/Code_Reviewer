
require("dotenv").config()
const app = require("./src/app")
require("./src/db/db")

const {createServer} = require("http")
const connectSocket = require("./src/services/socket.io")

const server = createServer(app)
connectSocket(server)

server.listen(4000, function(){
    console.log("app is running on port 4000");  
})
