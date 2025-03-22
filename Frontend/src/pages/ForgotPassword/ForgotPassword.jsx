
import React, { useState } from 'react'
import { BASE_URL } from '../../utils/Socket';
import {toast} from "react-toastify"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';

const ForgotPassword = () => {

    const [email,setEmail] = useState("");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        if(email.length <= 0) return;
        setLoading(true);
        axios.post(BASE_URL + "/v1/api/users/forgotPassword", {email})
        .then((res)=> {
            console.log(res);
            setLoading(false)
            toast.success(res?.data?.message)
            navigate("/reset-password")
        })
        .catch((err)=>{
            console.log(err);
            setLoading(false)
            toast.error(err?.response?.data?.message)
        })
    }

  return (
    <div className='w-full h-full flex items-center justify-center'>
        <div className='text-center w-full flex items-center justify-center flex-col gap-4'>
            <h2 className='font-semibold text-[17px]'>Enter your email to get code for reset Password</h2>
            <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text" 
                className='w-[50%] bg-gray-200 rounded px-4 py-2' 
            />
            <button onClick={handleClick} className='block bg-black px-6 py-2 rounded text-white font-semibold cursor-pointer'>
                { loading ? <Loading/> : "Submit"}
            </button>
        </div>
    </div>
  )
}

export default ForgotPassword