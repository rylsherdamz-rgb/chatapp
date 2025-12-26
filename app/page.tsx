"use client";

import {useEffect, useState} from "react"
import ChatRoom from "@/components/chatRoom";
import SideBar from "@/components/sidebar"
import SigUpModal from "@/components/SignUpModal"
import {io} from "socket.io-client" 
import SignUpModal from "@/components/SignUpModal";
 
export default function Home() {

  const [username, setUsername] = useState(true)


 useEffect(() => {


  }, []) 


  return  <div className="w-full h-screen  relative">

      <div className="w-20 h-full absolute">
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

      <div className=" h-full  md:ml-20">
        <ChatRoom />
      </div>

    </div>
}

