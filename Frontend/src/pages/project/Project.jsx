
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
            setAllMessages(prev => [...prev,{msg}])
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
            <div className='basis-[25%] bg-red-300 rounded-md relative '>
                <div className='w-full h-full overflow-y-scroll p-4'>
                    {
                        allMessages.map((data)=>(
                            <div className='w-fit px-4 py-2 mb-2 bg-gray-300 rounded-md'>{data.msg}</div>
                        ))
                    }
                </div>
                <form onSubmit={handleSubmit} className='w-full absolute bottom-0 left-0 flex gap-4 px-2 py-1'>
                    <input value={currentMessage} onChange={(e)=> setCurrentMessage(e.target.value)} className='border border-gray-400 px-4 py-2 basis-[75%] rounded' type="text" placeholder='Enter message' />
                    <button className='cursor-pointer px-4 py-2 bg-blue-300 basis-[25%] rounded'>Send</button>
                </form>
            </div>
            <div className='basis-[46%] bg-red-300 rounded-md'></div>
            <div className='basis-[28%] bg-red-300 rounded-md'></div>
        </section>
    </main>
  )
}

export default Project