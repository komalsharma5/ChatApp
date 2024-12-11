import React, { useEffect } from 'react'
import ChatUser from './ChatUser.jsx'
import Messages from './Messages.jsx'
import TypeSend from './TypeSend.jsx'
import useConversation from '../../Zustand/useConversation.js'
import { useAuth } from "../../Context/AuthProvider.jsx"
import { CiMenuFries } from "react-icons/ci";

const Right = () => {

  const { selectedConversation, setSelectedConversation } = useConversation()

  useEffect(()=>{
      return setSelectedConversation(null)
  },[setSelectedConversation])

  return (
    <div className='bg-slate-900  w-full text-gray-300'>
       <div>
      
      {
        !selectedConversation?(<NoChatSelected></NoChatSelected>) : (
          <>
            <ChatUser></ChatUser>
            <div  className=' overflow-y-auto' style={{maxHeight:"calc(92vh - 8vh)"}}>
              <Messages></Messages>
            </div> 
            <TypeSend></TypeSend>
        </>
        )
      }
      
    </div>
  </div>  
  )
}

export default Right;


const NoChatSelected = () =>{
  const [authUser] = useAuth()
  return (
    <>
    <div className="relative">
      <label htmlFor='my-drawer-2' className='brn brn-ghost lg:hidden absolute left-5'>

          <CiMenuFries  className='text-white text-xl' />
      </label>
      <div className='flex h-screen justify-center items-center'>
        <h1 className='text-center '>Welcome{" "}<span className='font-semibold text-xl'>{authUser.user.fullname}
        </span>
        <br></br>
        No chat selected, please start conversation by selecting anyone to your contacts</h1>
      </div>
      </div>
    </>
  )
}