import { useEffect, useState, useRef, useCallback } from "react"
import Peer, { MediaConnection } from "peerjs"
import { socketClient } from "@/lib/socketClient"

export type CallType = "Video" | "Audio"

interface UseCallProps {
  currentVideoRef: React.RefObject<HTMLVideoElement | null>
  remoteVideoRef: React.RefObject<HTMLVideoElement | null>
  type: CallType
}

export default function useCall({
  currentVideoRef,
  remoteVideoRef,
  type,
}: UseCallProps) {
  const peerRef = useRef<Peer | null>(null)
  const localStreamRef = useRef<MediaStream | null>(null)
  const incomingCallRef = useRef<MediaConnection | null>(null)

  const [peerId, setPeerId] = useState("")
  const [isRinging, setIsRinging] = useState(false)


  const attachStream = (
    ref: React.RefObject<HTMLVideoElement | null>,
    stream: MediaStream
  ) => {
    if (!ref.current) return
    ref.current.srcObject = stream
    ref.current.play()
  }

  const getMedia = async () => {
    return navigator.mediaDevices.getUserMedia({
      video: type === "Video",
      audio: true,
    })
  }

  const cleanupStreams = () => {
    localStreamRef.current?.getTracks().forEach(t => t.stop())
    localStreamRef.current = null
  }

  /* -------------------- Peer Setup -------------------- */

  useEffect(() => {
    const peer = new Peer()
    peerRef.current = peer

    peer.on("open", id => {
      setPeerId(id)
      socketClient.emit("peer-id", { id, room: "general" })
    })

    peer.on("call", call => {
      incomingCallRef.current = call
      setIsRinging(true)
    })

    return () => {
      cleanupStreams()
      peer.destroy()
    }
  }, [])

  /* -------------------- Call Actions -------------------- */

  const callPeer = useCallback(
    async (remotePeerId: string) => {
      if (!peerRef.current) return

      const stream = await getMedia()
      localStreamRef.current = stream
      attachStream(currentVideoRef, stream)

      const call = peerRef.current.call(remotePeerId, stream)

      call.on("stream", remoteStream => {
        attachStream(remoteVideoRef, remoteStream)
      })

      call.on("close", cleanupStreams)
    },
    [type]
  )

  const answerCall = useCallback(async () => {
    if (!incomingCallRef.current) return

    const stream = await getMedia()
    localStreamRef.current = stream
    attachStream(currentVideoRef, stream)

    incomingCallRef.current.answer(stream)

    incomingCallRef.current.on("stream", remoteStream => {
      attachStream(remoteVideoRef, remoteStream)
    })

    incomingCallRef.current.on("close", cleanupStreams)

    setIsRinging(false)
  }, [type])

  const rejectCall = useCallback(() => {
    incomingCallRef.current?.close()
    incomingCallRef.current = null
    setIsRinging(false)
  }, [])

  const endCall = useCallback(() => {
    incomingCallRef.current?.close()
    cleanupStreams()
  }, [])


  return {
    peerId,
    isRinging,
    callPeer,
    answerCall,
    rejectCall,
    endCall,
  }
}
