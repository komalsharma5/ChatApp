import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import user_routes from "./routes/user_routes.js"
import messageRoute from "./routes/Message.Route.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import { app, server } from "./SocketIO/server.js";




dotenv.config()
const PORT = process.env.PORT || 5173;
const MONGODB_URL = process.env.MOngo_Url

//through middlewere fetching data in json formate

app.use(express.json())
app.use(cors());
app.use(cookieParser());

//mongo db connection
try {
    mongoose.connect(MONGODB_URL);console.log("conected to MongoDB")   
} catch (error) {
    console.log(error);
  
}
//routes
app.use("/api/user", user_routes)
app.use("/api/message", messageRoute)



server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})