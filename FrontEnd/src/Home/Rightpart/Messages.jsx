import React, { useEffect, useRef } from 'react'
import UseGetMessage from '../../Context/UseGetMessage.js'
import Message from "./Message.jsx"
import Loading from "../../Components/Loading.jsx"
import UseGetSocketMsg from '../../Context/UseGetSocketMsg.jsx'
const Messages = () => {
  const { loading, messages } = UseGetMessage();
  UseGetSocketMsg() //listiening incoming messages
  console.log(messages);
  const lastMsgRef = useRef()
  useEffect(()=>{
    setTimeout(()=>{
      if(lastMsgRef.current){
        lastMsgRef.current.scrollIntoView({ behavior: "smooth"})
      }
    },100)
  },[messages])
  return (
    <div className='flex-1 overflow-y-auto' style={{minHeight:"calc(92vh - 8vh)"}}>
    

    {
      loading?(<Loading></Loading>):(messages.length>0 && messages.map((message)=>(
        <div key={message._id} ref={lastMsgRef}>
          <Message key={message._id} message={message} />
        </div>
        
      )))
    }

      {
        !loading && messages.length === 0 && (
          <div>
            <p className='text-center mt-[20%]'>Say! hi to start the conversation</p>
          </div>
        )
      }
    </div>
  )
}

export default Messages
