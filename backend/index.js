import express from "express"
import http from "http"
import { Server } from "socket.io"
const app = express()
app.use(express.json())
const httpServer = http.createServer(app)
const ServerSocket =  new Server(httpServer, {
    cors : {
        origin : "http://localhost:3000",
        methods : ["GET", "POST"]
    }
})
ServerSocket.on("connection", (socket) => {

    socket.on("username", (username) => {
        socket.username = username
    })


    socket.on("join room", (roomId) => {
        socket.join(roomId)
        socket.to(roomId).emit("user joined", {
            userId: socket.id,
            user: socket.username,
            roomId
        } 
    )
    console.log()    
    })
    socket.on("message sent", ({roomId, message}) => {

            socket.message = message
        socket.to(roomId).emit("message received", {
            userId: socket.id,
            user : socket.username,
            roomId,
            message : socket.message
        })
    })
    socket.on("leave room", (roomId) => {
        socket.leave(roomId)
        socket.to(roomId).emit("user leave", socket.username)
    })

    socket.on("disconnect", () => {
        if (socket.username) {
            socket.broadcast.emit("Leave", socket.username)
        }
    })
})

httpServer.listen(3001, () => {
    console.log("WebSocket is running at port 3001")
})