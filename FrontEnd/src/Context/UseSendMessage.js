import React, { useState } from 'react'
import useConversation from '../Zustand/useConversation.js'
import axios from "axios"
const UseSendMessage = () => {

    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation()


    const sendMessages = async(message)=>{
        setLoading(true)
       
            try {
                const res = await axios.post(`/api/message/send/${selectedConversation._id}`, { message })
                // setMessages(...messages,res.data)
                setMessages([...messages, res.data.newMessage]); // Correct

                setLoading(false)
            } catch (error) {
                console.log("Error in send messages", error);  
                setLoading(false) 
        }
    }
  return { loading , sendMessages }
    
}

export default UseSendMessage
