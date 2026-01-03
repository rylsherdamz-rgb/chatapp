"use client"
import { useState, useRef, useContext, useEffect } from "react"
import { socketClient } from "@/lib/socketClient";
import ChatRoom from "@/components/chatRoom"
import { AuthContext } from "@/context/chatProfileContext";
import type {Message} from "@/context/chatProfileContext"
import { Video, Phone, LogOut } from "lucide-react";


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
      setRoom(data.roomId)
      setUserId(data.userId)
      setUsername(data.username)
      const systemMessage: Message = {
        id: crypto.randomUUID(),
        userId: data.userId,
        username:data.username, 
        text: `${data.username} joined the room`,
        roomId: data.roomId,
        createdAt: Date.now(),
        textId: crypto.randomUUID(),
        type : "System"
      };

      setMessages((prev) => [...prev, systemMessage]);
   });
    socketClient.on("message received", (data) => {
      const newMessage: Message = {
        id: crypto.randomUUID(),
        userId: data.userId,
        username: data.user,
        text: data.message,
        roomId: data.roomId,
        createdAt: Date.now(),
        textId : data.messageId,
        type : "user"
      };
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socketClient.off("joined general");
      socketClient.off("message received");
      socketClient.off("general")
    };
  }, [setMessages]);

return <div className="w-full h-screen flex flex-col bg-gray-100">
      {/* 🔹 Header */}
      <div className="flex items-center justify-between gap-x-4 text-black bg-white p-4 shadow-sm">
        <div className="flex flex-row gap-x-5">
        <p className="text-xl font-semibold">General</p>
        </div>
       <div className=" flex flex-row gap-x-10 focus:outline-none">
        <div className="flex gap-x-5">
          <button className="border p-2 rounded-xl"><Video size={24} color="#000"/></button>
          <button className="border p-2 rounded-xl"><Phone size={24} color="#000"/></button>
        </div>

          <button className="border p-2 rounded-xl"><LogOut size={24} color="#000"/></button>
        </div>

      </div>

      {/* 🔹 Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => {
          const isMe = msg.userId === userId;
          const isSystem = msg.type === "System";

          // ✅ SYSTEM MESSAGE (CENTERED)
          if (isSystem) {
            return (
              <div key={msg.id} className="flex justify-center">
                <div className="px-4 py-1 text-sm text-gray-500 bg-gray-200 rounded-full">
                  {msg.text}
                </div>
              </div>
            );
          }

          // ✅ NORMAL MESSAGE
          return (
            <div
              key={msg.id}
              className={`flex items-end ${
                isMe ? "justify-end" : "justify-start"
              }`}
            >
              {!isMe && (
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-2">
                  {msg.username?.charAt(0).toUpperCase()}
                </div>
              )}

              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl break-words ${
                  isMe
                    ? "bg-green-500 text-white rounded-br-none"
                    : "bg-gray-300 text-black rounded-bl-none"
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