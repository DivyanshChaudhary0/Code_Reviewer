
const { Server } = require("socket.io")

const connectSocket = (server) => {
    const io = new Server(server,{
        cors: "*"
    });

    io.on("connection", function(socket){
        const projectId = socket.handshake.query.projectId
        socket.join(projectId)
        
        socket.on("message", function(data){
            console.log(data);
            socket.broadcast.to(projectId).emit("receiveMessage", data)
        })
    })
}

module.exports = connectSocket;
