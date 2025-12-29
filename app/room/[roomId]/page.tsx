"use client";
import { useContext, useEffect, useState } from "react";
import type { Message } from "@/context/chatProfileContext";
import { AuthContext } from "@/context/chatProfileContext";
import { socketClient } from "@/lib/socketClient"; 
import ChatRoom from "@/components/chatRoom";

export default function Room() {

  const context = useContext(AuthContext)
  if (!context) {
    throw Error("There isnt a context use")
  }
  // add roomName Later
  const {username, setRoom, setUsername, room, messages} = context
  const [message, setMEs]

  useEffect(() => {
  socketClient.on("user joined", (data) => {
    console.log(data)
  }) 
socketClient.on("message received", (data) => {
    console.log(data)
  })

    return () => {socketClient.off("user joined")
      socketClient.off("message received")
    }

  }, [])
  return  <div className="w-full  h-screen flex flex-col ">
    <div className="w-full text-white h-[60%]">
      <p className="text-xl text-green-300">
      {username} | {room} 
      </p>
      <div className="bg-white text-black w-full h-full overflow-y-auto">
      {
        messages.map((data, index) => (
          <div key={data.id}>{data.text}</div>
        ))
      }
      </div>
    </div>
    <ChatRoom />
    </div>
}

