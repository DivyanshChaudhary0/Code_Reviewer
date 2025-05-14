
import { io } from "socket.io-client";

export const BASE_URL = location.hostname === "localhost" ? "http://localhost:4000" : "https://code-reviewer-s8gs.onrender.com"

const socketConnection = (projectId) => {
        return io(BASE_URL,{
            query: {
                projectId,
                token: localStorage.getItem("token"),
            },
        })
}

export default socketConnection;
