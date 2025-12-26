import ChatBar from "./chatbar"
import { useState } from "react";
import {}


export default function ChatRoom() {
  const [Message, setMessage] = useState<string[] | []>([])


  return (
    <div className="w-full h-full">
      <div className="w-full h-[90%] border-b overflow-y-auto">
        {/* messages will go here */}
      </div>
      <div className="w-full h-[10%] flex items-center">
        <ChatBar />
      </div>
    </div>
  );
}
