'use client'

import SignUpModal from "@/components/SignUpModal"
import Footer from "@/components/Footer"
import JoinRoom from "@/components/JoinRoom"
import Navigation from "@/components/Navigation"
import AutomaticMatching from "@/components/AutomaticMatching"
import { useState, useEffect } from "react"
import { MessageCircle, Users, Zap, Hash } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const [showCreate, setShowCreate] = useState(false)
  const [showJoin, setShowJoin] = useState(false)
  const [showAuto, setShowAuto] = useState(false)
  const router = useRouter()

  function handleGeneralRoom() {
    router.push("/room")
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <Navigation />

      <main className="flex flex-col items-center px-4 pt-24">
        {/* HERO */}
        <section className="max-w-3xl text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-black">
            Chatify
          </h1>

          <p className="text-lg sm:text-xl text-gray-600">
            Jump into conversations instantly. No friction. No noise.
          </p>

          {/* PRIMARY CTA */}
          <div className="pt-6">
            <button
              className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:scale-[1.03] transition"
              onClick={handleGeneralRoom}
            >
              <Hash size={22} />
              Join General Chat
            </button>

            <p className="mt-3 text-sm text-gray-500">
              Start chatting instantly with everyone
            </p>
          </div>
        </section>

        {/* SECONDARY ACTIONS */}
        <section className="mt-14 w-full max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => setShowCreate(true)}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-6 py-5 hover:bg-gray-100 transition"
            >
              <Users className="text-black" size={24} />
              <span className="font-medium text-black">Create Room</span>
              <span className="text-xs text-gray-500 text-center">
                Start a private conversation
              </span>
            </button>

            <button
              onClick={() => setShowJoin(true)}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-6 py-5 hover:bg-gray-100 transition"
            >
              <MessageCircle className="text-black" size={24} />
              <span className="font-medium text-black">Join Room</span>
              <span className="text-xs text-gray-500 text-center">
                Enter with a room code
              </span>
            </button>

            <button
              onClick={() => setShowAuto(true)}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-6 py-5 hover:bg-gray-100 transition"
            >
              <Zap className="text-black" size={24} />
              <span className="font-medium text-black">Instant Match</span>
              <span className="text-xs text-gray-500 text-center">
                Get paired automatically
              </span>
            </button>
          </div>
        </section>

        {/* FEATURES */}
        <section className="mt-24 max-w-5xl w-full grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              icon: <MessageCircle size={40} />,
              title: "Real-Time Chat",
              desc: "Fast and seamless messaging experience."
            },
            {
              icon: <Users size={40} />,
              title: "Private Rooms",
              desc: "Invite-only spaces for focused conversations."
            },
            {
              icon: <Zap size={40} />,
              title: "Instant Matching",
              desc: "No rooms, no codes — just chat."
            }
          ].map((f, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-200 bg-white p-6 text-center space-y-3"
            >
              <div className="mx-auto text-black">{f.icon}</div>
              <h3 className="font-semibold text-black">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </section>

        <Footer />
      </main>

      {/* MODALS */}
      {showCreate && <SignUpModal />}
      {showJoin && <JoinRoom />}
      {showAuto && <AutomaticMatching />}
    </div>
  )
}
