
import { io } from "socket.io-client";

export const BASE_URL = location.hostname === "localhost" ? "http://localhost:4000" : "http://3.110.28.69/api"

const socketConnection = (projectId) => {
    return io(BASE_URL, {
        path: "/api/socket.io/",  // Correct WebSocket path
        query: {
            projectId,
            token: localStorage.getItem("token"),
        },
        transports: ["websocket", "polling"], // Ensures WebSockets work properly
    });
};

export default socketConnection;
