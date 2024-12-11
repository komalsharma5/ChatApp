import { useSocketContext } from "../../Context/SocketContext.jsx"
import useConversation from "../../Zustand/useConversation.js"
import { CiMenuFries } from "react-icons/ci";
const ChatUser = () => {

  const { selectedConversation } = useConversation()
  console.log(selectedConversation);
  const { onlineUsers } = useSocketContext();

  const getOnlineUsersStatus = (userId)=>{
    return onlineUsers.includes(userId)? "Online" : "Offline"
  }
  return (
    <div  className="relative flex items-center h-[8%] justify-center gap-4 bg-slate-800 hover:bg-gray-500">
    <label htmlFor='my-drawer-2' className='brn brn-ghost lg:hidden absolute left-5'>

        <CiMenuFries  className='text-white text-xl' />
    </label>
    <div className='flex space-x-3 items-center justify-center bg-gray-800 hover:bg-gray-700 duration-300 h-[8vh]'>
        <div className="avatar online">
            <div className="w-16 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
        </div>
        <div>
            <h1 className='text-xl'>{selectedConversation.fullname}</h1>
            <span className='text-sm'>{getOnlineUsersStatus(selectedConversation._id)}</span>
        </div>
        </div>
    </div>

  )
}

export default ChatUser
