
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from "axios"
// import { BASE_URL } from '../utils/Socket';

// const Protected = ({children}) => {

//     const navigate = useNavigate();
//     const [user,setUser] = useState(null)

//     let token = localStorage.getItem("token");

//     useEffect(function(){
//         if(!token){
//             navigate("/login")
//         }
//         axios.get(BASE_URL + "/v1/api/users/profile",{
//             headers: {Authorization: `bearer ${localStorage.getItem("token")}`}
//         })
//         .then((res)=> {
//             console.log(res)
//             if(res?.data?.user?.isVerified === false){
//                 return navigate("/forgot-password")
//             }
//             setUser(res?.data?.user)
//         })
//         .catch((err)=>{
//             navigate("/login")
//         })
//     },[])

//     if(!user){
//         return navigate("/login")
//     }

//     if(!user.isVerified){
//         return navigate("/forgot-password")
//     }

//     return children

// }

// export default Protected

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { BASE_URL } from '../utils/Socket';

const Protected = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        let isMounted = true; // Prevent state update on unmounted component

        axios.get(BASE_URL + "/v1/api/users/profile", {
            headers: { Authorization: `bearer ${token}` },
        })
        .then((res) => {
            if (!isMounted) return;
            if (res?.data?.user?.isVerified === false) {
                navigate("/forgot-password");
                return;
            }
            setUser(res.data.user);
        })
        .catch(() => {
            navigate("/login");
        });

        return () => {
            isMounted = false; // Cleanup function to prevent memory leaks
        };
    }, [token, navigate]);

    if (!user) return null; // Prevent rendering while user data is loading

    return children;
};

export default Protected;
