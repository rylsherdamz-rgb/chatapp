import { socketClient } from "@/lib/socketClient"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useContext } from "react"
import {  AuthContext } from "@/context/chatProfileContext"
import { X } from "lucide-react"


export default function JoinRoom() {
  const router = useRouter()
  const context = useContext(AuthContext)
  if (!context) {
     throw Error("this is outside the Provider")
  }
  const {username, setUsername, room, setRoom} = context
  const [showModal, setShowModal]  = useState<boolean>(true)
  const handleUserSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const roomId = room 
    socketClient.emit("join room", {roomId, username})
    // use a better storage for the id of the user
    setShowModal(false)
    router.push(`/room/${roomId}`)
  }

 return  !showModal ? null : (
  <div className=" inset-0 z-50 flex items-center justify-center  fixed">
    
    <div className="w-[90%] max-w-md rounded-2xl bg-white shadow-xl relative">
  <button onClick={() => setShowModal(false)} className="focus:outline-none flex justify-center items-center top-2 right-2 w-10 h-10 absolute rounded-xl">
      <X size={26} color="#000"/>
    </button>
      <form
        onSubmit={handleUserSignUp}
        className="flex h-full flex-col justify-center gap-6 px-6 py-10"
      >
        <h2 className="text-center text-xl font-semibold text-black">
          Enter Username
        </h2>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600">Username</label>
          <input
            className="rounded-xl border border-gray-300 px-3 py-2 text-black focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your name"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600">Enter Room ID</label>
          <input
            className="rounded-xl border border-gray-300 px-3 py-2 text-black focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Your Room ID"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-2 rounded-xl bg-black py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Enter
        </button>
      </form>
    </div>
  </div>
)
}
