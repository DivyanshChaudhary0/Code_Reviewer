
import { io } from "socket.io-client";

const socketConnection = (projectId) => {
    return io("http://localhost:3000", {
        query: { projectId , token: localStorage.getItem("token")},
    });
}

export default socketConnection;
