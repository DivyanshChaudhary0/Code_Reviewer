
const { Server } = require("socket.io");
const messageModel = require("../models/message.model");
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

const connectSocket = (server) => {
    const io = new Server(server,{
        cors: "*"
    });

    io.on("connection", async function(socket){
        const {projectId,token} = socket.handshake.query

        const decoded = jwt.verify(token,"huihui");
        const user = await userModel.findById(decoded._id)

        socket.user = user;

        socket.join(projectId)
        
        socket.on("message", async function(data){
            const message = await messageModel.create({
                text: data,
                projectId
            })
            console.log(message);
            socket.broadcast.to(projectId).emit("receiveMessage", {msg:data,username:user.username})
        })
    })
}

module.exports = connectSocket;
