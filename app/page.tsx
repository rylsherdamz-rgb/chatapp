'use client'

import SignUpModal from "@/components/SignUpModal"
import JoinRoom from "@/components/JoinRoom" 
import { useState } from "react"



export default function Home(){
  const [visible, setVisible] = useState<boolean>(false)
const HandleButton = (type : string) => {
   if (type === "createRoom") {
      if (visible) {
        setVisible(false)
        return (
          <SignUpModal />
        )
      }else {
        setVisible(true)
      }
   }
}
  

  return <div className="w-full h-full flex-1 justify-center ">
    <div className="flex flex-row gap-x-5">
      <button className="bg-white text-black px-2 py-1 rounded-lg font-semibold">
        Create a room
      </button>
      <button className="bg-white text-black px-2 py-1 rounded-lg font-semibold">
    Join a room
      </button>
    </div>


  </div>
}