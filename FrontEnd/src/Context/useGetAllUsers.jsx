import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie"
import axios from 'axios'

const useGetAllUsers = () => {
    const [allUsers,setAllUsers] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        const getUsers = async()=>{ 
            try {
                const token = Cookies.get("jwt");
               const response = await axios.get("/api/user/allusers",{
                    credentials : "include",
                    headers : {
                        "Authorization" : `Bearer ${token}`
                        }
                })
                setAllUsers(response.data)
                console.log(setAllUsers);
                
                setLoading(false)
            } catch (error) {
               console.log("Error in getallusers" + error);
               
            }
        } 
        getUsers()
    },[])
  return [allUsers,loading]}

export default useGetAllUsers;
