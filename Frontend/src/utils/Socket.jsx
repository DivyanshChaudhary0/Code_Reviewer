
import { io } from "socket.io-client";

export const BASE_URL = "http://localhost:4000"

const socketConnection = (projectId) => {
    return io("http://localhost:4000", {
        query: { projectId , token: localStorage.getItem("token")},
    });
}

export default socketConnection;
