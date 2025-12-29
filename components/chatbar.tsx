import React, { useState } from "react";
import type { Message } from "@/context/chatProfileContext";
import {Send} from "lucide-react"
import { AuthContext } from "@/context/chatProfileContext";
import { socketClient } from "../lib/socketClient";
import { useContext } from "react";

export default function ChatBar() {
  const context = useContext(AuthContext)
  if (!context) return;

  const {setMessages, messages, userId, room, username} = context
  const [message, setMessage] = useState<string >()
  const trackMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const Inputmessage : Message = {
      id : crypto.randomUUID(),
      text: e.target.value,
      userId : userId,
      username : username ,
      roomId : room,
      createdAt : Date.now(),
    }

      setMessages((prev) => [...prev,Inputmessage]);
  };
  const sendMessage = () => {
     socketClient.emit("message sent", message) 
     setMessage("")
  };

  return (
    <div className="w-full  flex mx-5 my-2 border rounded-xl bg-gray-900">
       
      <input
        onChange={(e) => trackMessage(e)}
        value={message}
        className="w-full truncate p-3 bg-transparent rounded-xl outline-none"
        type="text"
        placeholder="Type your message..."
      />
      <button onClick={sendMessage} className="px-5"><Send size={24} /></button>
    </div>
  );
}
