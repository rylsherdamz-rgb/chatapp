"use client"

import { useState, useRef, useContext, useEffect } from "react"
import { socketClient } from "@/lib/socketClient"
import ChatRoom from "@/components/chatRoom"
import { AuthContext } from "@/context/chatProfileContext"
import type { Message } from "@/context/chatProfileContext"
import { Video, Phone, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

import useCall, { CallType } from "@/hooks/useCall"
import CallModal from "@/components/CallModal"

export default function GeneralRoom() {
  const context = useContext(AuthContext)
  if (!context) return null
  const {
    messages,
    userId,
    setMessages,
    setRoom,
    setUserId,
    setUsername,
  } = context

  const router = useRouter()

  /* ---------------- Call state ---------------- */

  const currentVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  const [callOpen, setCallOpen] = useState(false)
  const [callType, setCallType] = useState<CallType>("Video")
  const [remotePeerId, setRemotePeerId] = useState("")

  const {
    callPeer,
    isRinging,
  } = useCall({
    currentVideoRef,
    remoteVideoRef,
    type: callType,
  })


  const messagesEndRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])


  useEffect(() => {
    socketClient.emit("general")

    socketClient.on("joined general", (data) => {
      setRoom(data.roomId)
      setUserId(data.userId)
      setUsername(data.username)

      setMessages(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          userId: data.userId,
          username: data.username,
          text: `${data.username} joined the room`,
          roomId: data.roomId,
          createdAt: Date.now(),
          textId: crypto.randomUUID(),
          type: "System",
        },
      ])
    })

    socketClient.on("id", (data) => {
      setRemotePeerId(data.id)
    })

    socketClient.on("message received", (data) => {
      setMessages(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          userId: data.userId,
          username: data.user,
          text: data.message,
          roomId: data.roomId,
          createdAt: Date.now(),
          textId: data.messageId,
          type: "user",
        },
      ])
    })

    return () => {
      socketClient.off("joined general")
      socketClient.off("message received")
      socketClient.off("id")
    }
  }, [])


  const leaveRoom = () => {
    socketClient.emit("leave room", "general")
    setMessages([])
    router.push("/")
  }

  const startCall = (type: CallType) => {
    setCallType(type)
    setCallOpen(true)
  }


  return (
    <div className="flex h-screen flex-col bg-gray-100">
      {/* HEADER */}
      <header className="flex items-center justify-between bg-white px-4 text-black py-3 shadow-sm">
        <h1 className="text-lg font-semibold text-black">General</h1>

        <div className="flex items-center gap-3">
          <button
            onClick={() => startCall("Video")}
            className="rounded-xl border p-2 hover:bg-gray-100"
          >
            <Video size={22} />
          </button>

          <button
            onClick={() => startCall("Audio")}
            className="rounded-xl border p-2 hover:bg-gray-100"
          >
            <Phone size={22} />
          </button>

          <button
            onClick={leaveRoom}
            className="rounded-xl border p-2 hover:bg-gray-100"
          >
            <LogOut size={22} />
          </button>
        </div>
      </header>

      {/* MESSAGES */}
      <main className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg) => {
          const isMe = msg.userId === userId
          const isSystem = msg.type === "System"

          if (isSystem) {
            return (
              <div key={msg.id} className="flex justify-center">
                <span className="rounded-full bg-gray-200 px-4 py-1 text-sm text-gray-600">
                  {msg.text}
                </span>
              </div>
            )
          }

          return (
            <div
              key={msg.id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                  isMe
                    ? "bg-green-500 text-white rounded-br-none"
                    : "bg-gray-300 text-black rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </main>

      {/* INPUT */}
      <div className="border-t bg-white p-3">
        <ChatRoom />
      </div>

      {/* CALL MODAL */}
      <CallModal
        open={callOpen || isRinging}
        onClose={() => setCallOpen(false)}
        remotePeerId={remotePeerId}
        type={callType}
        currentVideoRef={currentVideoRef}
        remoteVideoRef={remoteVideoRef}
      />
    </div>
  )
}
