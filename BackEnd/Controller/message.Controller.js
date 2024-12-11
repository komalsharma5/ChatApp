import Conversation from "../Models/conversation.Model.js"

import Message from "../Models/message.Model.js";
import { getReciverSocketId, io } from "../SocketIO/server.js";

export const sendMessage = async(req,res) => {
    try {
        const { message } = req.body;
        const {id: reciverId} = req.params;
        const senderId = req.user._id//current logged in user
       let conversation = await Conversation.findOne({
            members:{$all: [senderId,reciverId]}
        })
        if(!conversation){
            conversation = await Conversation.create({
                members:[senderId,reciverId],
                messages: [],
            })
        }
        const newMessage = new Message({
            senderId,
            reciverId,
            message
             
        })
        if (newMessage){
            conversation.messages.push(newMessage._id)
        }
        // await conversation.save()
        // await newMessage.save()
    
        await Promise.all([conversation.save(), newMessage.save()])// run parellel
        const reciverSocketId = getReciverSocketId(reciverId);
        if(reciverSocketId){
            io.to(reciverSocketId).emit("newMessage", newMessage)
        }
        res.status(200).json({
            message:"Message sent successfully",
            newMessage,  
        })  
    } catch (error) {
        console.log("Error in send Message",  error.message);
        res.status(500).json({
            message: "Internal server error"
        })
        
    }
}

export const getMessage = async(req,res) =>{
    try {
        const {id: chatUser} = req.params;
        const senderId = req.user._id
        let conversation = await Conversation.findOne({
            members:{$all: [senderId,chatUser]},
        }).populate("messages")
        if(!conversation){
            return res.status(200).json([])
        }
        const messages = conversation.messages;
        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in get Message",  error.message);
        res.status(500).json({
            message: "Internal server error"
        }) 
    }
}


