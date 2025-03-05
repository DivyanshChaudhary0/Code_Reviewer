
const app = require("./src/app")
require("./src/db/db")

const {createServer} = require("http")
const connectSocket = require("./src/service/socket.io")

const server = createServer(app)
connectSocket(server)

server.listen(3000, function(){
    console.log("app is running on port 3000");  
})
