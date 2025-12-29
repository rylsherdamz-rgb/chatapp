"use client";
import { useContext } from "react";
import { AuthContext } from "@/context/chatProfileContext";
import ChatRoom from "@/components/chatRoom";

export default function Room() {
  const context = useContext(AuthContext)
  if (!context) {
    throw Error("There isnt a context use")
  }
  // add roomName Later
  const {username, setRoom, setUsername, room} = context

  return  <div className="w-full  h-screen flex flex-col ">
    <div className="w-full text-white h-[60%]">
      <p className="text-xl text-green-300">
      {username}
      </p>
    </div>
    <ChatRoom />
    </div>
}

