import { socketClient } from "@/lib/socketClient"
import { useRouter } from "next/navigation"
import { useState, useContext, useEffect } from "react"
import { AuthContext } from "@/context/chatProfileContext"
import { X } from "lucide-react"

export default function AutomaticMatching() {
  const router = useRouter()
  const context = useContext(AuthContext)
  if (!context) throw Error("this is outside the Provider")
  const { username, setUsername, setRoom } = context
  const [showModal, setShowModal] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleUserSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!username) return
    setIsSubmitting(true)
    // Emit username only; server will assign the room automatically
    socketClient.emit("auto join", username)
  }

  useEffect(() => {
    // Listen for room assignment from server
    socketClient.on("user waiting", (data: { roomId: string }) => {
      setRoom(data.roomId)
      console.log(data)
      setShowModal(false)
      router.push(`/room/${data.roomId}`)
    })
socketClient.on("room-ready", (data: { roomId: string }) => {
      setRoom(data.roomId)
      console.log(data)
      setShowModal(false)
      router.push(`/room/${data.roomId}`)
    })

    // Optional: handle errors like room full
    socketClient.on("room-full", () => {
      alert("No room available at the moment. Try again later.")
      setIsSubmitting(false)
    })

    return () => {
      socketClient.off("room-assigned")
      socketClient.off("room-full")
    }
  }, [router, setRoom])

  return !showModal ? null : (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-[90%] max-w-md rounded-2xl bg-white shadow-xl relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center rounded-xl focus:outline-none"
        >
          <X size={26} color="#000" />
        </button>
        <form
          onSubmit={handleUserSignUp}
          className="flex flex-col gap-6 px-6 py-10"
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 rounded-xl bg-black py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
          >
            {isSubmitting ? "Joining..." : "Enter"}
          </button>
        </form>
      </div>
    </div>
  )
}
