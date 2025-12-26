import express from "express"
import http from "http"
import { Server } from "socket.io"
const app = express()
app.use(express.json())
const httpServer = http.createServer(app)
const ServerSocket =  new Server(httpServer, {
    cors : {
        origin : "http://localhost:300",
        methods : ["GET", "METHOD"]
    }
})
ServerSocket.on("connection", (socket) => {

    socket.on("username", (username) => {
        socket.username =username
    })


    socket.on("join room", (roomId) => {
        socket.join(roomId)
        socket.to(roomId).emit("user joined", {
            user: socket.username,
            roomId
        })
    })
    socket.on("message sent", ({roomId, message}) => {
        ServerSocket.to(roomId).emit("message received", {
            user : socket.username,
            message
        })
    })
    socket.on("leave room", (roomId) => {
        socket.leave(roomId)

        socket.to(roomId).emit("user leave", socket.username)
    })

    socket.on("disconnect", () => {
        if (socket.user) {
            socket.broadcast.emit("Leave", socket.io)
        }
    })
})

httpServer.listen(3001, () => {
    console.log("WebSocket is running at port 3001")
})