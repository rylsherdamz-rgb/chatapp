import express from "express"
import http from "http"
import { ServerCrashIcon } from "lucide-react"
import { Server } from "socket.io"
import { v4 } from "uuid"
const app = express()
app.use(express.json())
const httpServer = http.createServer(app)
const ServerSocket =  new Server(httpServer, {
    cors : {
        origin : "http://localhost:3000",
        methods : ["GET", "POST"]
    }
})



let pendingRoom = null
ServerSocket.on("connection", (socket) => {


  socket.on("auto join", (username) => {
        socket.username = username
    if (!pendingRoom) {
        pendingRoom = v4() 
        socket.join(pendingRoom)
        socket.emit("user waiting", {
            userId : socket.id,
            user : socket.username,
            roomId : pendingRoom,
            status: "waiting"
        })
        
    }else {
            const roomId = pendingRoom
            const users = ServerSocket.sockets.adapter.rooms.get(roomId) 
         const    numberOfClient = users ? users.size :0 
            // adjust the size to have bigger room or just for the two people

            if (numberOfClient < 2) { 
                socket.join(roomId)
                pendingRoom = null
ServerSocket.to(roomId).emit("room-ready", { roomId, users });
            }
            else {
                socket.emit("room full ", roomId)
            }
        }
 
  })


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