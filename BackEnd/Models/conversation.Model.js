import mongoose from "mongoose"
import User from "../Models/UserModel.js"
import Message from "./message.Model.js"

const conversationSchema = new mongoose.Schema(
    {
        members:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:User,
            required:true
        }],
        messages:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:Message,
            default:[]
        }]
    },{
        timestamps:true
    })

    const Conversation = mongoose.model("conversation", conversationSchema)

    export default Conversation