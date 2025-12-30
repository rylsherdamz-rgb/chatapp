"use client"
import { useState, useRef, useContext } from "react"
import ChatRoom from "@/components/chatRoom"
import { AuthContext } from "@/context/chatProfileContext";


export default function GeneralRoom() {

    const context = useContext(AuthContext)
    if (!context) return;
    const {messages} = context
  const messagesEndRef = useRef<HTMLDivElement>(null);
    return <div className="w-full h-full  flex  bg-white ">
        <div className="w-30 flex justify-center  rounded-4xl items-center  h-[10vh] px-5 py-5">
            <p className="text-black text-2xl">General</p>
        </div>
        <ChatRoom />
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
                className={`max-w-[70%] px-4 py-2 rounded-2xl break-words ${
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
      <div className="p-4 bg-gray-200">
        <ChatRoom />
      </div>

    </div>
}