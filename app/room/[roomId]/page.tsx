"use client";
import { useContext } from "react";
import { AuthContext } from "@/context/chatProfileContext";
import ChatRoom from "@/components/chatRoom";

export default function Room() {

  const context = useContext(AuthContext)

  if (!context) {
    throw Error("There isnt a context use")
  }

  const {username, setRoom, setUsername, room} = context

  return  <div className="w-full h-screen ">
    <ChatRoom />
    
    </div>
}

