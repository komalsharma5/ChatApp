// import  { useEffect } from 'react'
// import { useSocketContext } from './SocketContext.jsx'
// import useConversation from '../Zustand/useConversation.js';

// const UseGetSocketMsg = () => {
//     const {socket} = useSocketContext();
//     const { messages, setMessages } = useConversation();

//     useEffect=(()=>{
//         socket.on("newMessage",(newMessage) =>{
//             setMessages([...messages, newMessage])
//         })
//         return () =>{
//             socket.off("newMessage")
//         }
//     },[socket, messages, setMessages])
// }

// export default UseGetSocketMsg;





import { useEffect } from 'react';
import { useSocketContext } from './SocketContext.jsx';
import useConversation from '../Zustand/useConversation.js';
import sound from "../assets/notification.mp3";


const UseGetSocketMsg = () => {
    const { socket } = useSocketContext();
    const { setMessages } = useConversation();

    useEffect(() => {
        // Handler for new messages
        const handleNewMessage = (newMessage) => {
            const notification = new Audio(sound)
            notification.play()
            setMessages((prevMessages) => [...prevMessages, newMessage]); // Safely update state
        };

        if (socket) {
            socket.on("newMessage", handleNewMessage);
        }

        return () => {
            if (socket) {
                socket.off("newMessage", handleNewMessage);
            }
        };
    }, [socket, setMessages]);

    return null; // Component doesn't render anything
};

export default UseGetSocketMsg;
