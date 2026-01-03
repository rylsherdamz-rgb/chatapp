"use client";

import { Phone, Video , LogOut} from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Copy } from "lucide-react";
import type { Message } from "@/context/chatProfileContext";
import { AuthContext } from "@/context/chatProfileContext";
import { socketClient } from "@/lib/socketClient";
import ChatRoom from "@/components/chatRoom";

export default function Room() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("There isn’t a context use");

  const { username, room, messages, setMessages, userId } = context;

  const [copy, setCopy] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const leaveRoom = () => {
    socketClient.emit("leave");
  };

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(room);
      setCopy(true);
      setTimeout(() => setCopy(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔽 Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔽 Socket listeners
  useEffect(() => {
    socketClient.on("user joined", (data) => {
      const systemMessage: Message = {
        id: crypto.randomUUID(),
        userId: "System",
        username: "System",
        text: `${data.username} joined the room`,
        roomId: data.roomId,
        createdAt: Date.now(),
        textId: crypto.randomUUID(),
        type :"System"
      };

      setMessages((prev) => [...prev, systemMessage]);
    });

    socketClient.on("room-ready", (data) => {
      const systemMessage: Message = {
        id: crypto.randomUUID(),
        userId: "System",
        username: "System",
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
        textId: data.messageId,
        type : "user"
      };

      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socketClient.off("user joined");
      socketClient.off("user-ready");
      socketClient.off("message received");
      socketClient.off("room-ready")
    };
  }, [setMessages]);

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      {/* 🔹 Header */}
      <div className="flex items-center justify-between gap-x-4 text-black bg-white p-4 shadow-sm">
        <div className="flex flex-row gap-x-5">
        <p className="text-lg font-semibold">{room}</p>

        <button
          onClick={copyRoomId}
          className="border rounded-lg flex items-center justify-center w-10 h-10 hover:bg-gray-100"
        >
          <Copy size={20} />
        </button>
 
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

      {/* 🔹 Input */}
      <div className="p-4 bg-white border-t">
        <ChatRoom />
      </div>
    </div>
  );
}

