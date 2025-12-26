"use client";

import {useEffect, useState} from "react"
import ChatRoom from "@/components/chatRoom";
import SideBar from "@/components/sidebar"
import SigUpModal from "@/components/SignUpModal"
import SignUpModal from "@/components/SignUpModal";
import { socketClient } from "@/lib/socketClient";
 
export default function Home() {

  const [username, setUsername] = useState<any >("")
  const [showModal, setShowModal] = useState<boolean>(true)

  const handleUserSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    socketClient.emit("user connected",username)
    setShowModal(false)
  }

  return  <div className="w-full h-screen   relative">

    
   { showModal && <div className="w-[80%] absolute mx-[10%] top-10 shadow-amber-200 h-[40vh] bg-white">
    <form onSubmit={handleUserSignUp}
       className="w-full h-full px-5 flex-col justify-center items-center gap-y-2 py-2" >
      <label className="text-black" htmlFor="">Username</label>
      <input className="border rounded-xl border-gray-600 focus:outline-none text-black px-1" type="text" name="" id=""
      value={username} 
      onChange={(e) => setUsername(e.target.value)}
      />
      <button className="text-black my-3 mx-5" type="submit">Enter</button>
   </form>

    </div>
   } 
      <div className="w-20 h-full max-sm:hidden ">
        {/*add thte sidebarherej
        add things for this to be more responsive
        */}
      <SideBar />
      </div>

      {/* {
       username && <div className="w-100 h-100 absolute top-0 border-1 bg-black"> 
       <SignUpModal />
      </div> 
    } */}

      <div className=" w-full h-full  md:ml-20">
        <ChatRoom />
      </div>

    </div>
}

