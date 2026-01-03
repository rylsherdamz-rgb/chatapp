"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { Copy } from "lucide-react";
import type { Message } from "@/context/chatProfileContext";
import { AuthContext } from "@/context/chatProfileContext";
import { socketClient } from "@/lib/socketClient"; 
import ChatRoom from "@/components/chatRoom";


export default function Room() {
  const context = useContext(AuthContext);
  if (!context) throw Error("There isn’t a context use");

  const { username, room, messages, setMessages, userId } = context;
  const [copy, setCopy] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const leaveRoom = () => {
    socketClient.emit("leave")
  }

  const copyRoomId = async () => {
    try {
    await navigator.clipboard.writeText(room)
    setCopy(true)
    setTimeout(() => setCopy(false), 2000)
    } catch (err) {
      console.log(err)
    }
 }
  const deleteMessage = (messageId : string, type : string) => {
     if (type == "me") {
        setMessages(prev => prev.filter(
          message => message.textId != messageId
        ))
     } 
  }



  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socketClient.on("user joined", (data) => {
      const newMessage: Message = {
        id: crypto.randomUUID(),
        userId: data.userId,
        username: data.username,
        text: data.message,
        roomId: data.roomId,
        createdAt: data.createdAt,
        textId  : data.messageId
      };
      setMessages((prev) => [...prev, newMessage]);

      console.log(data)
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
        textId  : data.messageId
      };
      setMessages((prev) => [...prev, newMessage]);
    });
    return () => {
      socketClient.off("user joined");
      socketClient.off("user waiting")
      socketClient.off("message received");
    };
  }, [setMessages]);
  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="flex flex-row  bg-white gap-x-5 text-black p-4">

        <p className="text-lg font-semibold my-1">{room}</p>
        <button onClick={copyRoomId} className="bg-white border rounded-lg  focus:outline-none  flex items-center justify-center w-10 h-10">

            <Copy className="text-black " size={24} />
        </button>
      </div>
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => {
          const isMe = msg.userId === userId;
          const System = msg.userId === "System"
          return (
            <div
              key={msg.id}
              className={`flex items-end ${isMe ? "justify-end" : "justify-start"}`}
            >
              {
                System && (<div className="text-lg font-semibold items-center text-black">{msg.text}</div>)
              }
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
              
{/* <button
              onClick={() => deleteMessage(msg.textId, "me")}
        > delete this</button>
      */}
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
