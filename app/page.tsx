'use client'

import SignUpModal from "@/components/SignUpModal"
import Footer from "@/components/Footer"
import JoinRoom from "@/components/JoinRoom"
import Navigation from "@/components/Navigation"
import AutomaticMatching from "@/components/AutomaticMatching"
import { useState } from "react"
import { MessageCircle, Users, Zap, Hash } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const [showCreate, setShowCreate] = useState(false)
  const [showJoin, setShowJoin] = useState(false)
  const [showAuto, setShowAuto] = useState(false)
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-24">
        {/* HERO */}
        <section className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black">
            Chatify
          </h1>

          <p className="text-base sm:text-xl text-gray-600">
            Jump into conversations instantly. No friction. No noise.
          </p>

          {/* CTA */}
          <div className="pt-6 flex flex-col items-center gap-3">
            <button
              onClick={() => router.push("/room")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:scale-[1.03] transition"
            >
              <Hash size={22} />
              Join General Chat
            </button>

            <p className="text-sm text-gray-500">
              Start chatting instantly with everyone
            </p>
          </div>
        </section>

        {/* ACTIONS */}
        <section className="mt-16 sm:mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <ActionCard
              icon={<Users size={26} />}
              title="Create Room"
              desc="Start a private conversation"
              onClick={() => setShowCreate(true)}
            />

            <ActionCard
              icon={<MessageCircle size={26} />}
              title="Join Room"
              desc="Enter with a room code"
              onClick={() => setShowJoin(true)}
            />

            <ActionCard
              icon={<Zap size={26} />}
              title="Instant Match"
              desc="Get paired automatically"
              onClick={() => setShowAuto(true)}
            />
          </div>
        </section>

        {/* FEATURES */}
        <section className="mt-24 sm:mt-28">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <MessageCircle size={42} />,
                title: "Real-Time Chat",
                desc: "Fast and seamless messaging experience."
              },
              {
                icon: <Users size={42} />,
                title: "Private Rooms",
                desc: "Invite-only spaces for focused conversations."
              },
              {
                icon: <Zap size={42} />,
                title: "Instant Matching",
                desc: "No rooms, no codes — just chat."
              }
            ].map((f, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-200 bg-white p-8 text-center space-y-4"
              >
                <div className="mx-auto text-black">{f.icon}</div>
                <h3 className="text-lg font-semibold text-black">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
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

/* ---------------- Small Reusable Card ---------------- */

function ActionCard({
  icon,
  title,
  desc,
  onClick,
}: {
  icon: React.ReactNode
  title: string
  desc: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-6 py-6 hover:bg-gray-100 transition active:scale-[0.98]"
    >
      <div className="text-black">{icon}</div>
      <span className="font-medium text-black">{title}</span>
      <span className="text-xs text-gray-500 text-center">{desc}</span>
    </button>
  )
}
