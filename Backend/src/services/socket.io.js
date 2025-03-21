
const { Server } = require("socket.io");
const messageModel = require("../models/message.model");
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

const connectSocket = (server) => {
    const io = new Server(server,{
        cors: "*"
    });

    io.on("connection", async function(socket){
        const {token,projectId} = socket.handshake.query;

        const decoded = jwt.verify(token,"huihui");
        const user = await userModel.findById(decoded._id)

        socket.user = user;

        socket.on("chat-room", function(){
            socket.join(projectId)
        })

        socket.on("message", async function(data){
            const message = await messageModel.create({
                text: data,
                projectId,
                userId: user._id
            })
            socket.broadcast.to(projectId).emit("receiveMessage", {message})
            // msg:data,username:user.username
        })
    })
}

module.exports = connectSocket;
