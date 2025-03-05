
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = ({children}) => {

    const navigate = useNavigate();

    let token = localStorage.getItem("token");

    useEffect(function(){
        if(!token){
            navigate("/login")
        }
    },[])


    return children
}

export default Protected