
import { useEffect, useState } from 'react';
import socketConnection from './Socket';

const useSocketConnection = (projectId,setAllMessages) => {

    const [socket,setSocket] = useState(null);

    useEffect(function(){
        const tempSocket = socketConnection(projectId)

        tempSocket.emit("chat-room", {projectId})

        tempSocket.on("receiveMessage", function({data}){
            setAllMessages(prev => [...prev,data])
        })

        setSocket(tempSocket)

        return () => {
            tempSocket.disconnect();
        }

    },[projectId])

  return socket;

}

export default useSocketConnection