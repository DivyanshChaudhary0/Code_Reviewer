
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { BASE_URL } from '../utils/Socket';

const Protected = ({children}) => {

    const navigate = useNavigate();

    let token = localStorage.getItem("token");

    useEffect(function(){
        if(!token){
            navigate("/login")
        }
        axios.get(BASE_URL + "/v1/api/users/profile",{
            headers: {Authorization: `bearer ${localStorage.getItem("token")}`}
        })
        .then((res)=> {
            console.log(res)
        })
        .catch((err)=>{
            navigate("/login")
        })
    },[])


    return children
}

export default Protected