import { Server } from "socket.io"; 
import http from "http";;
import express from "express";

const app = express();

// Create the HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3001", // Correct origin format
        methods: ["GET", "POST"],
         // Correct method property
         credentials: true, // If using authentication with cookies
    },
});

//realtime msg dcode goes here
export const getReciverSocketId = (reciverId) =>{
    return users[reciverId];
}
const users = {}
// Listen for socket events
io.on("connection", (socket) => {
    // console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;

    if (userId) {
        users[userId] = socket.id;
        // console.log("Updated users list:", users);
    } 
    //used to send the events to all connected users
    io.emit("getOnlineUsers", Object.keys(users));
    // listen client side events emmitted by server side (server $ client)
    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        delete users[userId];
        io.emit("getOnlineUsers", Object.keys(users));
    });
});

// Export the necessary modules
export { app, io, server };