
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import socketConnection from '../../utils/Socket';

const Project = () => {

    const {projectId} = useParams();
    const [currentMessage,setCurrentMessage] = useState("");
    const [allMessages,setAllMessages] = useState([])

    useEffect(function(){
        const socket = socketConnection(projectId)
        socket.on("receiveMessage", function(msg){
            setAllMessages(prev => [...prev,msg])
        })
    },[])


    function handleSubmit(e){
        e.preventDefault();
        const socket = socketConnection(projectId)
        socket.emit("message", currentMessage)
        setCurrentMessage("");
    }

  return (
    <main className='w-full h-full '>
        <section className='w-full h-full flex gap-8 px-10 py-4'>
            <div className='basis-[25%] bg-gray-200 rounded-md relative '>
                <div className='w-full max-h-[90%] overflow-y-scroll p-4'>
                    {
                        allMessages.map((data)=>(
                            <div className="chat chat-start">
                                <div className="chat-header">{data.username}</div>
                                <div className="chat-bubble bg-white">{data.msg}</div>
                            </div>
                        ))
                    }
                </div>
                <form onSubmit={handleSubmit} className='w-full absolute bottom-0 left-0 flex gap-4 px-2 py-1 bg-gray-300'>
                    <input value={currentMessage} onChange={(e)=> setCurrentMessage(e.target.value)} className='border bg-white border-gray-400 px-4 py-1 basis-[85%] rounded' type="text" placeholder='Enter message' />
                    <button className='cursor-pointer px-2 py-1 bg-blue-400 basis-[15%] rounded'><i class="ri-send-plane-fill"></i></button>
                </form>
            </div>
            <div className='basis-[46%] bg-black rounded-md'></div>
            <div className='basis-[28%] bg-black rounded-md'></div>
        </section>
    </main>
  )
}

export default Project