import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthProvider.jsx'
import {io}  from 'socket.io-client'

const socketContext = createContext()
//it is a hook
export const useSocketContext = () =>{
    return useContext(socketContext)
}
export const SocketProvider = ({children}) =>{
    const [socket, setSocket] = useState(null)
    const [authUser] = useAuth()
    const [onlineUsers, setOnlineUsers] = useState([])

    useEffect(()=>{
        // console.log("authUser:", authUser);
        if(authUser){
            const socket = io("http://localhost:5000",
           { query:{
                userId:authUser.user.id,
            }})
            console.log("Socket connected with userId:", authUser.user.id)
            
            setSocket(socket);
            socket.on("getOnlineUsers",(users)=>{
                setOnlineUsers(users);
            })
            return()=>socket.close();
        }else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    },[authUser])

    return(
        <socketContext.Provider value={{ socket , onlineUsers }}> 
            {children}
        </socketContext.Provider>
    )
}
