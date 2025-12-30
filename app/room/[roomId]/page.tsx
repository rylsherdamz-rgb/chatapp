"use client";
import { useContext, useEffect, useRef } from "react";
import type { Message } from "@/context/chatProfileContext";
import { AuthContext } from "@/context/chatProfileContext";
import { socketClient } from "@/lib/socketClient"; 
import ChatRoom from "@/components/chatRoom";

export default function Room() {
  const context = useContext(AuthContext);
  if (!context) throw Error("There isn’t a context use");

  const { username, room, messages, setMessages, userId } = context;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socketClient.on("user joined", (data) => {
   });

   socketClient.on("user waiting", ( data) => {
    console.log(data)
   })

    socketClient.on("message received", (data) => {
      const newMessage: Message = {
        id: crypto.randomUUID(),
        userId: data.userId,
        username: data.user,
        text: data.message,
        roomId: data.roomId,
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socketClient.off("user joined");
      socketClient.off("message received");
    };
  }, [setMessages]);

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between bg-white text-black p-4">
        <p className="text-lg font-semibold">{room}</p>
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
  );
}
