import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import UseSendMessage from '../../Context/UseSendMessage.js';

const TypeSend = () => {
const { loading , sendMessages } = UseSendMessage()
const [message, setMessage] = useState("")

const submitHandler = async(e) =>{
  e.preventDefault();
  await sendMessages(message)
  setMessage("")
}
  return (
    <form onSubmit={submitHandler}>
       <div className='flex space-x-2 h-[8vh] bg-gray-800'>
         <div className='w-[70%] mx-4'>
              <input type="text" placeholder="Type here" 
               value={message} 
               onChange={(e)=>setMessage(e.target.value)}
               className=" border border-gray-700 outline-none w-full px-4 py-3 mt-1 bg-gray-800 rounded-xl"  />
      </div>
        <button> 
            <IoSend className='text-3xl'/>
        </button>
    </div>
   

    </form>
   
  )
}

export default TypeSend
