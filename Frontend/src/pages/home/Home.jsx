
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/Socket';

const Home = () => {

    const [projects,setProjects] = useState([]);
    const [modal,setModal] = useState(false);
    const [projectName,setProjectName] = useState("");
    const [error,setError] = useState("");

    const navigate = useNavigate();

    function getProjects(){
        axios.get( BASE_URL + "/v1/api/projects/list",{
            headers: {
                Authorization: "bearer " + localStorage.getItem("token")
            }
        })
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
        axios.post( BASE_URL + "/v1/api/projects/create",{name:projectName},{
            headers: {
                Authorization: "bearer " + localStorage.getItem("token")
            }
        })
        .then((res)=>{
            getProjects();
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
        <section className='w-full h-full p-10 relative'>
            <div className='flex gap-4 flex-wrap'>
                {
                    projects?.map((project,idx) => (
                        <button onClick={()=> navigate(`/project/${project._id}`)} key={idx} className='px-4 py-4 bg-blue-100 rounded cursor-pointer font-medium text-xl'>{project.name}</button>
                    ))
                }
            <button onClick={()=> {
                setModal(true) 
                setError("")}
                } className='px-6 py-2 bg-blue-100 rounded cursor-pointer'> New Project </button>
            </div>
            {
                modal && <div className='w-full h-full flex items-center justify-center absolute top-0 left-0 bg-gray-100 opacity-70'>
                    <form className='w-[400px] flex flex-col gap-4 relative' onSubmit={handleSubmit}>
                        <div onClick={()=> setModal(false)} className='absolute -top-16 right-0 w-8 h-8 cursor-pointer rounded-full bg-gray-500 text-white flex items-center justify-center'><i className="ri-close-large-fill"></i></div>
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