
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [projects,setProjects] = useState([]);
    const [modal,setModal] = useState(false);
    const [projectName,setProjectName] = useState("");
    const [error,setError] = useState("");

    const navigate = useNavigate();

    function getProjects(){
        axios.get("http://localhost:3000/v1/api/projects/list")
        .then((res)=>{
            setProjects(res.data.data)
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    useEffect(function(){
        getProjects();
    },[])

    function handleSubmit(e){
        e.preventDefault();
        axios.post("http://localhost:3000/v1/api/projects/create",{name:projectName})
        .then((res)=>{
            getProjects();
            console.log(res);
        })
        .catch((err)=>{
            setError(err.response.data.message)
            console.log(err);
        })
        setModal(false)
        setProjectName("")
    }

  return (
    <main className='w-full h-full'>
        <section className='w-full h-full bg-black p-10 relative'>
            <div className='flex gap-4 flex-wrap'>
                {
                    projects?.map((project,idx) => (
                        <button onClick={()=> navigate(`/chat/${project._id}`)} key={idx} className='px-4 py-2 bg-blue-200 rounded cursor-pointer font-medium'>{project.name}</button>
                    ))
                }
            <button onClick={()=> {
                setModal(true) 
                setError("")}
                } className='px-4 py-2 bg-blue-200 rounded cursor-pointer'>Create</button>
            </div>
            {
                modal && <div className='w-full h-full flex items-center justify-center absolute top-0 left-0 bg-gray-100 opacity-70'>
                    <form className='w-[400px] flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div className="input-group ">
                            <input value={projectName} onChange={(e)=> setProjectName(e.target.value)} type="text" placeholder='Enter project name' className='px-4 py-2 w-full border border-black rounded' />
                        </div>
                        <button className='px-4 py-2 bg-blue-400 rounded text-white cursor-pointer'> Create </button>
                    </form>
                </div>
            }
            {
                error && <div className='text-red-600 font-semibold'>{error}</div>
            }
        </section>
    </main>
  )
}

export default Home