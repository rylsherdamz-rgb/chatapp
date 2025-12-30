'use client'

import SignUpModal from "@/components/SignUpModal"
import Footer from "@/components/Footer"
import JoinRoom from "@/components/JoinRoom"
import AutomaticMatching from "@/components/AutomaticMatching"
import { useState, useEffect, useRef } from "react"
import { MessageCircle, Users, Zap } from "lucide-react"

export default function LandingPage() {
  const [showCreate, setShowCreate] = useState(false)
  const [showJoin, setShowJoin] = useState(false)
  const [showAuto, setShowAuto] = useState(false)

    return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-start py-16 px-4">
      {/* HERO */}
      <div  className="max-w-4xl text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-black">Chatify</h1>
        <p className="text-lg sm:text-xl text-gray-700">
          Connect instantly with friends or strangers. Create a room, join one, or let the system match you automatically.
        </p>
      </div>

      {/* ACTION BUTTONS */}
      <div  className="mt-12 flex flex-col z-10 items-center sm:flex-row gap-4">
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          <Users size={20} /> Create a Room
        </button>
        <button
          onClick={() => setShowJoin(!showJoin)}
          className="flex items-center gap-2 bg-white border border-gray-300 text-black px-6 py-3 rounded-xl font-semibold shadow hover:scale-105 transition-transform"
        >
          <MessageCircle size={20} /> Join a Room
        </button>
        <button
          onClick={() => setShowAuto(!showAuto)}
          className="flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold shadow hover:scale-105 transition-transform"
        >
          <Zap size={20} /> Instant Match
        </button>
      </div>

      {/* MODALS */}
      {showCreate && <SignUpModal />}
      {showJoin && <JoinRoom />}
      {showAuto && <AutomaticMatching />}

      {/* FEATURE CARDS */}
      <div  className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl w-full">
        <div className="bg-gray-100 rounded-2xl shadow-md p-6 flex flex-col items-center text-center space-y-3 hover:scale-105 transition-transform">
          <MessageCircle className="text-black" size={48} />
          <h3 className="font-semibold text-lg text-black">Instant Chat</h3>
          <p className="text-sm text-gray-700">Send messages instantly to anyone in your room.</p>
        </div>
        <div className="bg-gray-100 rounded-2xl shadow-md p-6 flex flex-col items-center text-center space-y-3 hover:scale-105 transition-transform">
          <Users className="text-black" size={48} />
          <h3 className="font-semibold text-lg text-black">Private Rooms</h3>
          <p className="text-sm text-gray-700">Create or join rooms for secure private conversations.</p>
        </div>
        <div className="bg-gray-100 rounded-2xl shadow-md p-6 flex flex-col items-center text-center space-y-3 hover:scale-105 transition-transform">
          <Zap className="text-black" size={48} />
          <h3 className="font-semibold text-lg text-black">Auto Match</h3>
          <p className="text-sm text-gray-700">Instantly connect with someone without searching for rooms.</p>
        </div>
      </div>

      {/* FOOTER */}
      
      <Footer />
   </div>
  )
}
