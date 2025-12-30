'use client'

import SignUpModal from "@/components/SignUpModal"
import JoinRoom from "@/components/JoinRoom" 
import AutomaticMatching from "@/components/AutomaticMatching"
import { useState } from "react"


export default function Home(){
  const [visible, setVisible] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)
  const [invisble, setInvisible] = useState<boolean>(false)
const HandleButtonCreate = () => {
      if (show) {
        setShow(false)
      }else {
        setShow(true)
      }
}
const HandleButtonJoin = () => {
      if (visible) {
        setVisible(false)
      }else {
        setVisible(true)
      }
}
const HandleButtonAutomatic = () => {
      if (invisble) {
        setInvisible(false)
      }else {
        setInvisible(true)
      }
}
  

  return <div className="w-full h-full flex-1 justify-center ">
    <div className="flex flex-row gap-x-5">
      <button className="bg-white text-black px-2 py-1 rounded-lg font-semibold"
      onClick={HandleButtonCreate} 
      >
        Create a room
      </button>
      <button 
      onClick={HandleButtonJoin}
      className="bg-white text-black px-2 py-1 rounded-lg font-semibold">
    Join a room
      </button>
      <button 
      onClick={HandleButtonAutomatic}
      className="bg-white text-black px-2 py-1 rounded-lg font-semibold">
    Instant Join
      </button>
    </div>

  {show && <SignUpModal />}
  {visible && <JoinRoom />}
  {invisble && <AutomaticMatching />}
   
  </div>
}