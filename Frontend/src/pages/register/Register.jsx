
import axios from 'axios';
import React, { useState } from 'react'
import { BASE_URL } from '../../utils/Socket';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';

const Register = () => {

    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);
    

    const [error,setError] = useState("")
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();

        setLoading(true)
        axios.post(BASE_URL + "/v1/api/users/register",{username,email,password})
        .then((res)=>{
            localStorage.setItem("token", res.data.token)
            toast.success("OTP sent successfully! ✅");
            setLoading(false);
            navigate("/verify")
        })
        .catch((err)=>{
            setError(err.response.data.message)
            toast.error(err.response.data.message);
            setLoading(false);
            console.log(err);      
        })
    }


  return (
    <main className='w-full h-full '>
        <section className='w-full h-full flex flex-col items-center justify-center bg-gray-200'>
            <form className='md:w-[400px] w-[350px] flex flex-col gap-6 bg-white rounded-md p-10' onSubmit={handleSubmit} >
                <h2 className='text-center text-2xl'>Register Page</h2>
                <input
                    type="text" 
                    placeholder='Enter username' 
                    className='px-4 py-2 border border-gray-400 rounded-md outline-blue-500'
                    value={username} 
                    onChange={(e)=> setUsername(e.target.value)} 
                    required
                />
                <input 
                    type="text" 
                    placeholder='Enter email' 
                    className='px-4 py-2 border border-gray-400 rounded-md outline-blue-500'
                    value={email} 
                    onChange={(e)=> setEmail(e.target.value)} 
                    required
                />
                <input 
                    type="text" 
                    placeholder='Enter password'
                    className='px-4 py-2 border border-gray-400 rounded-md outline-blue-500'
                    value={password} 
                    onChange={(e)=> setPassword(e.target.value)} 
                    required
                />
                <Link to="/login" className='font-semibold'>Already have an account? <span className='text-blue-600'>Login</span></Link >
                <button className='px-4 py-2 bg-blue-500 rounded-md text-white'>
                    { loading ? <Loading/> : "Register"}
                </button>
            </form>
            {error && <div className='font-semibold text-red-600 mt-4'>{error}</div> }
        </section>
    </main>
  )
}

export default Register