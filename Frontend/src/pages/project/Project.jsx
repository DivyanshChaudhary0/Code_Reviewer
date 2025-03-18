
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import socketConnection, { BASE_URL } from '../../utils/Socket';
import axios from "axios"
import EditablePrismEditor from '../../components/Prism';
import ReactMarkdown from "react-markdown";
import { ToastContainer, toast } from 'react-toastify';

const Project = () => {

    const {projectId} = useParams();
    const [currentMessage,setCurrentMessage] = useState("");
    const [allMessages,setAllMessages] = useState([])

    const [code, setCode] = useState("");
    const [generateReview,setGenerateReview] = useState(false);
    const [review,setReview] = useState(null);

    const notify = (data) => toast(data);

    useEffect(function(){
        const socket = socketConnection(projectId)
        socket.on("receiveMessage", function(msg){
            setAllMessages(prev => [...prev,msg])
        })

        axios.get(`${BASE_URL}/v1/api/messages/get-all/${projectId}`,{
            headers: {
                Authorization: "bearer " + localStorage.getItem("token")
            }
        })
        .then((res)=>{
            console.log(res);
            setAllMessages(res.data.data)
        })
        .catch((err)=>{
            console.log(err);
        })

    },[])

    useEffect(function(){
        axios.get(`${BASE_URL}/v1/api/projects/getCode/${projectId}`,{
            headers: {
                Authorization: "bearer " + localStorage.getItem("token")
            }
        })
        .then((res)=> {
            console.log(res);
            setCode(res.data.code)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])


    function handleSubmit(e){
        e.preventDefault();
        const socket = socketConnection(projectId)
        socket.emit("message", currentMessage)
        setCurrentMessage("");
    }

    function saveCode(){
        if(code.length < 2) return;

        axios.patch(`${BASE_URL}/v1/api/projects/update/${projectId}`,{code},{
            headers: {
                Authorization: "bearer " + localStorage.getItem("token")
            }
        })
        .then((res)=>{
            notify("Code saved successfully!!!")
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    function reviewCode(){
        if(code.length < 2) return;
        setGenerateReview(true);
        axios.post(BASE_URL + "/v1/api/projects/review",{code},{
            headers: {
                Authorization: "bearer " + localStorage.getItem("token")
            }
        })
        .then((res)=>{
            console.log(res);
            setReview(res.data?.response)
            setGenerateReview(false)
        })
        .catch((err)=>{
            console.log(err);
            setGenerateReview(false)
        })
    }

  return (
    <main className='min-w-screen h-full '>
        <section className='w-full h-full flex gap-8 px-10 py-4'>
            <div className='basis-[25%] bg-gray-200 rounded-md relative '>
                <div className='w-full max-h-[90%] overflow-y-scroll p-4'>
                    {
                        allMessages.map((data)=>(
                            <div className="chat chat-start">
                                <div className="chat-header">{data.username || data.userId.username}</div>
                                <div className="chat-bubble bg-white">{data.msg || data.text}</div>
                            </div>
                        ))
                    }
                </div>
                <form onSubmit={handleSubmit} className='w-full absolute bottom-0 left-0 flex gap-4 px-2 py-1 bg-gray-300'>
                    <input value={currentMessage} onChange={(e)=> setCurrentMessage(e.target.value)} className='border bg-white border-gray-400 px-4 py-1 basis-[85%] rounded' type="text" placeholder='Enter message' />
                    <button className='cursor-pointer px-2 py-1 bg-blue-400 basis-[15%] rounded'><i className="ri-send-plane-fill"></i></button>
                </form>
            </div>
            <div className='basis-[46%] bg-black rounded-md relative'>
                <EditablePrismEditor code={code} setCode={setCode} />
            </div>
            <div className='w-[28%] h-full  rounded-md p-2'>
                <div className='w-full flex items-center justify-between'>
                    <button onClick={saveCode} className='text-xs font-semibold px-4 py-2 rounded bg-amber-300 cursor-pointer'>Save Code</button>
                    <button onClick={reviewCode} className='text-xs font-semibold px-4 py-2 rounded bg-amber-300 cursor-pointer'>{generateReview ? "Generating..." : "Review Code"}</button>
                </div>
                <div className='w-full max-h-[85vh] mt-4 px-3 overflow-y-scroll'>
                    <ReactMarkdown>{review}</ReactMarkdown>;
                </div>
            </div>
        </section>
    </main>
  )
}

export default Project