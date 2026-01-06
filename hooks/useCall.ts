import {useEffect, useState, useRef} from "react"
import {socketClient }  from "@/lib/socketClient"
import Peer from "peerjs"

export type callType = "Video" | "Audio";


interface useCallProp {
    currentVideoRef : React.RefObject<HTMLVideoElement | null>,
    remoteVideoRef :  React.RefObject<HTMLVideoElement | null>
    type :  callType
}

export default function useCall({ currentVideoRef, remoteVideoRef, type }: useCallProp) {
    const peerInstance = useRef<Peer | null>(null) 
    const [peerId, setPeerId] = useState<string>('')
    const [remotePeerValue, setRemotePeerValue] = useState<string>("")
      useEffect(() => {
    const peer = new Peer()
  peer.on("open", (id) => {
    setPeerId(id)
    socketClient.emit("peer-id", {id , room: "general"})
  })
  peer.on("call", (call) => {
    let  getUserMedia = navigator.mediaDevices.getUserMedia  

    getUserMedia({video : type === "Video" ? true : false , audio : false}).then((mediaStream) => {
      if (!currentVideoRef) return;
      if (!currentVideoRef.current) return;
      currentVideoRef.current.srcObject = mediaStream
      currentVideoRef.current?.play()
      call.answer(mediaStream)
      call.on("stream", (remoteMediaStream) => {
      if (!remoteVideoRef) return;
      if (!remoteVideoRef.current) return;

        remoteVideoRef.current.srcObject = remoteMediaStream
        remoteVideoRef.current.play()
      })
    })
  })
  peerInstance.current = peer
   
  return () => peer.destroy()
  }, [])



    const call = (remotePeerId: string) => {
    let  getUserMedia = navigator.mediaDevices.getUserMedia  

    getUserMedia({video : type === "Video" ? true : false  , audio :   true}).then((mediaStream) => {
      if (!currentVideoRef) return;
      if (!currentVideoRef.current) return;
      currentVideoRef.current.srcObject = mediaStream
      currentVideoRef.current?.play()

      if (!peerInstance.current) return
      const call = peerInstance.current.call(remotePeerId, mediaStream)  

      call.on("stream", (remoteMediaStream) => {
      if (!remoteVideoRef) return;
      if (!remoteVideoRef.current) return;

        remoteVideoRef.current.srcObject = remoteMediaStream
        remoteVideoRef.current.play()
 
      })
     })

  }
 

    return {call, remotePeerValue, setRemotePeerValue}
}