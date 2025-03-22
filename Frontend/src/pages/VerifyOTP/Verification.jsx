
import axios from 'axios';
import React, { useState } from 'react'
import { BASE_URL } from '../../utils/Socket';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Verification = () => {

    const [otp,setOTP] = useState(["","","",""]);
    const navigate = useNavigate();

    function handleChange(e,idx){
        let value = e.target.value;
        if (isNaN(value) || value.length > 1) return;
        let newOtp = [...otp]
        newOtp[idx] = value;
        setOTP(newOtp)

        if (value && idx < 3) {
            document.getElementById(`otp-${idx + 1}`).focus();
        }
    }

    function handleKeyDown(e, idx) {
        if (e.key === "Backspace" && !otp[idx] && idx > 0) {
            document.getElementById(`otp-${idx - 1}`).focus();
        }
    }

    function submitOTP(){
        let sendOtp = otp.join("")
        
        axios.post(BASE_URL + "/v1/api/users/verify",{otp: sendOtp},{
            headers: {Authorization: `bearer ${localStorage.getItem("token")}`}
        })
        .then((res)=> {
            console.log(res);
            toast.success("User register successfully! ✅");
            navigate("/")
        })
        .catch((err)=> {
            toast.error("User register failed ❌");
            console.log(err);
        })
    }

    function resendOTP(){
        axios.post(BASE_URL + "/v1/api/users/resendOtp",{},{
            headers: {Authorization: `bearer ${localStorage.getItem("token")}`}
        })
        .then((res)=> {
            toast.success("OTP sent successfully! ✅");
            console.log(res);
        })
        .catch((err)=> {
            console.log(err);
            toast.error("Failed to resend OTP ❌");
        })
    }


  return (
    <div className='w-full h-full flex items-center justify-center'>
        <div className='px-16 py-8 shadow-2xl text-center'>
        <h2 className='font-semibold text-2xl py-4 pb-8'>Verify the OTP</h2>
            <div className=' flex items-center gap-2'>

                {
                    ["1","2","3","4"].map((val,idx)=> (
                        <div className='w-12 h-12 flex items-center justify-center'>
                            <input 
                                type="text" 
                                id={`otp-${idx}`}
                                value={otp[idx]} 
                                onChange={(e)=> handleChange(e,idx)}
                                onKeyDown={(e)=> handleKeyDown(e,idx)}
                                maxLength={1} 
                                className=' w-full h-full text-center p-2 rounded bg-gray-200 font-semibold text-2xl' 
                            />
                        </div>
                    ))
                }
            </div>
            <div className='mt-6 flex gap-4'>
                <button onClick={submitOTP} className='px-4 py-2 bg-blue-400 text-white font-semibold rounded cursor-pointer'>Submit</button>
                <button onClick={resendOTP} className='px-4 py-2 bg-orange-600 text-white font-semibold rounded cursor-pointer'>Resend OTP</button>
            </div>
        </div>

    </div>
  )
}

export default Verification