
import { io } from "socket.io-client";

const socketConnection = (projectId) => {
    return io("http://localhost:3000", {
        query: { projectId },
    });
}

export default socketConnection;
