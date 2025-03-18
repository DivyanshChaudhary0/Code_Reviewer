
import { io } from "socket.io-client";

export const BASE_URL = location.hostname === "localhost" ? "http://localhost:4000" : "http://3.110.28.69/app"

const socketConnection = (projectId) => {
    if(location.hostname === "localhost"){
        return io("http://localhost:3000",{
            query: {
                projectId,
                token: localStorage.getItem("token"),
            },
        });
    }
    else{
        return io("/", {
            path: "/app/socket.io",
            query: {
                projectId,
                token: localStorage.getItem("token"),
            },
        })
    }
};

export default socketConnection;
