'use client'

import { Phone, PhoneOff, Video } from "lucide-react"
import useCall, { CallType } from "@/hooks/useCall"

interface CallModalProps {
  open: boolean
  onClose: () => void
  remotePeerId?: string
  type: CallType
  currentVideoRef: React.RefObject<HTMLVideoElement | null>
  remoteVideoRef: React.RefObject<HTMLVideoElement | null>
}

export default function CallModal({
  open,
  onClose,
  remotePeerId,
  type,
  currentVideoRef,
  remoteVideoRef,
}: CallModalProps) {
  const {
    callPeer,
    answerCall,
    rejectCall,
    endCall,
    isRinging,
  } = useCall({
    currentVideoRef,
    remoteVideoRef,
    type,
  })

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden">
        {/* HEADER */}
        <div className="px-6 pt-6 text-center space-y-1">
          <h2 className="text-xl font-semibold text-black">
            {isRinging ? "Incoming Call" : "Calling…"}
          </h2>

          <p className="text-sm text-gray-500">
            {type === "Video" ? "Video Call" : "Audio Call"}
          </p>
        </div>

        {/* VIDEO AREA */}
        <div className="relative mt-4 aspect-video bg-black">
          <video
            ref={remoteVideoRef}
            className="w-full h-full object-cover"
            playsInline
            autoPlay
          />

          <video
            ref={currentVideoRef}
            muted
            className="absolute bottom-3 right-3 w-24 h-24 rounded-xl object-cover border border-white shadow-lg bg-black"
            playsInline
            autoPlay
          />
        </div>

        {/* ACTIONS */}
        <div className="px-6 py-6 flex justify-center gap-6">
          {isRinging ? (
            <>
              <button
                onClick={rejectCall}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white hover:scale-105 transition"
              >
                <PhoneOff />
              </button>

              <button
                onClick={answerCall}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white hover:scale-105 transition"
              >
                <Phone />
              </button>
            </>
          ) : (
            <>
              {remotePeerId && (
                <button
                  onClick={() => callPeer(remotePeerId)}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white hover:scale-105 transition"
                >
                  {type === "Video" ? <Video /> : <Phone />}
                </button>
              )}

              <button
                onClick={() => {
                  endCall()
                  onClose()
                }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white hover:scale-105 transition"
              >
                <PhoneOff />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
