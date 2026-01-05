import express from "express"
import http from "http"
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

    socket.on("general", () => {
        socket.username = v4() 
        socket.room = "general"
        socket.join("general")
        ServerSocket.to("general").emit("joined general",{
            username: socket.username,
            room : "general",
            userId : socket.id,
            message : ` ${socket.username} has joined the room`,
            messageId : v4(),
            createdAt : Date.now()
        })
    })

   socket.on("peer-id", ({id, room})=> {
        socket.to(room).emit("id", {room, id})
   }) 

   socket.on("delete message for all",({messageId, username, roomId}) => {
               socket.to(roomId).emit("message delete", {
                username,
                messageId,
               })
    } )

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
            ServerSocket.to(roomId).emit("room-ready", { 
            username: socket.username,
            roomId ,
            userId : "System",
            message : ` ${socket.username} has joined the room`,
            messageId : v4(),
            createdAt : Date.now()
             });
            }
            else {
                socket.emit("room full ", roomId)
            }
            pendingRoom = null
        }
 
  })

    socket.on("join room", ({roomId, username}) => {
        socket.username = username
        socket.join(roomId)
        socket.to(roomId).emit("user joined", {
            username: socket.username,
            room : roomId,
            userId : "System",
            message : ` ${socket.username} has joined the room`,
            messageId : v4(),
            createdAt : Date.now()
        } 
    )
    })
    socket.on("message sent", ({roomId, message}) => {
            socket.message = message
            socket.to(roomId).emit("message received", {
            userId: socket.id,
            user : socket.username,
            roomId,
            message : socket.message,
            messageId : v4() 
        })
    })
    socket.on("leave room", (roomId) => {
        socket.leave(roomId)
        socket.to(roomId).emit("user leave", {
            username: socket.username,
            room : roomId,
            userId : "System",
            message : ` ${socket.username} has leave the room`,
            messageId : v4(),
            createdAt : Date.now()
        })
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