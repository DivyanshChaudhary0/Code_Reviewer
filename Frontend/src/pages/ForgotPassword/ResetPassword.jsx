
import axios from 'axios';
import React, { useState } from 'react'
import {toast} from "react-toastify"
import { BASE_URL } from '../../utils/Socket';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {

    const [otp,setOtp] = useState("");
    const [password,setPassword] = useState("");
    const [cnfPassword, setCnfPassword] = useState("");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const handleReset = () => {
        if(!password || !cnfPassword || !otp){
            return toast.error("Fill all data first")
        }
        if(otp.length <= 3){
            return toast.error("Otp is not correct")
        }
        if(password !== cnfPassword){
            return toast.error("Password do not match...!")
        }

        setLoading(true)
        axios.post(BASE_URL + "/v1/api/users/resetPassword", {otp, password})
        .then((res)=> {
            setLoading(false)
            toast.success(res?.data?.message)
            navigate("/login")
        })
        .catch(err => {
            setLoading(false)
            toast.error(err?.response?.data?.message)
        })
    }


  return (
    <div className='w-full h-full flex items-center justify-center'>
        <div className='w-full text-center flex items-center justify-center flex-col gap-4'>

            <input 
                type="text" 
                maxLength={4}
                value={otp}
                onChange={(e)=> setOtp(e.target.value)}
                className='px-4 py-2 rounded bg-gray-100 w-[40%]' 
                placeholder='Enter otp'
            />
            <input 
                type="text" 
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                className='px-4 py-2 rounded bg-gray-100 w-[40%]' 
                placeholder='Enter password'
            />
            <input 
                type="text" 
                value={cnfPassword}
                onChange={(e)=> setCnfPassword(e.target.value)}
                className='px-4 py-2 rounded bg-gray-100 w-[40%]' 
                placeholder='Confirm password'
                />

            <button onClick={handleReset} className='px-6 py-2 rounded bg-black text-white cursor-pointer'>
                {loading ? <Loading/> : "Reset Password"}
            </button>
        </div>
    </div>
  )
}

export default ResetPassword