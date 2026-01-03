"use client"
import { useState, useRef, useContext, useEffect } from "react"
import { socketClient } from "@/lib/socketClient";
import ChatRoom from "@/components/chatRoom"
import { AuthContext } from "@/context/chatProfileContext";
import type {Message} from "@/context/chatProfileContext"


export default function GeneralRoom() {
// Scroll to bottom when messages change

    const context = useContext(AuthContext)
    if (!context) return;
    const {messages, userId, setMessages, setRoom, setUserId, setUsername} = context
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const deleteMessage = (messageId : string, type : string) => {
     if (type == "me") {
        setMessages(prev => prev.filter(
          message => message.textId != messageId
        ))
     } 
  }
  useEffect(() => {
    

    socketClient.emit("general")
    socketClient.on("joined general", (data) => {
      console.log(data)
      setRoom(data.roomId)
      setUserId(data.userId)
      setUsername(data.username)
   });
    socketClient.on("message received", (data) => {
      const newMessage: Message = {
        id: crypto.randomUUID(),
        userId: data.userId,
        username: data.user,
        text: data.message,
        roomId: data.roomId,
        createdAt: Date.now(),
        textId : data.messageId
      };
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socketClient.off("joined general");
      socketClient.off("message received");
      socketClient.off("general")
    };
  }, [setMessages]);


    return <div className="w-full h-screen  flex flex-col  bg-white ">
        <div className="w-30 flex justify-center  rounded-4xl items-center  h-[10vh] px-5 py-5">
            <p className="text-black text-2xl">General</p>
            {userId }
        </div>
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => {
          const isMe = msg.userId === userId;
          return (
            <div
              key={msg.id}
              className={`flex items-end ${isMe ? "justify-end" : "justify-start"}`}
            >
              {!isMe && (
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-2">
                  {msg.username?.charAt(0).toUpperCase()}
                </div>
              )}
              <div

                className={`max-w-[70%] px-4 py-2 rounded-2xl  break-words ${
                  isMe ? "bg-green-500 text-white rounded-br-none" : "bg-gray-300 text-black rounded-bl-none"
                }`}
              >
                
                {msg.text}
              </div>
              {isMe && (
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold ml-2">
                  {msg.username?.charAt(0).toUpperCase()}
               </div>
              )}
            
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat input */}
      
      <div className="p-4  ">
        <ChatRoom />
      </div>

    </div>
}