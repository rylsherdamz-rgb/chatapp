import ChatBar from "./chatbar"
import { Plus } from "lucide-react";
import { useState } from "react";


export default function ChatRoom() {

  return (
    <div className="w-full h-full">
      <div className="w-full h-[90%] border-b overflow-y-auto">
        {/* messages will go here */}
      </div>
      <div className="w-full h-[10%] flex items-center">
        <div className="m-2">
   <button className="bg-gray-900 w-10 flex justify-center items-center h-10 rounded-full" >
       <Plus color="#fff" size={24} /> 
      </button>

        </div>

        <ChatBar />
      </div>
    </div>
  );
}
