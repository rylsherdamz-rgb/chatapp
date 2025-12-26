import React, { useState } from "react";
import {Send} from "lucide-react"
import { socketClient } from "../lib/socketClient";

export default function ChatBar() {
  const [message, setMessage] = useState<string | null>("");

  const trackMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const message = e.target.value;

    setTimeout(() => {
      setMessage(message.toString().trim());
    }, 500);
  };

  const sendMessage = () => {
  };

  return (
    <div className="w-full  flex mx-5 my-2 border rounded-xl bg-gray-900">
      <input
        onChange={(e) => trackMessage(e)}
        className="w-full truncate p-3 bg-transparent rounded-xl outline-none"
        type="text"
        placeholder="Type your message..."
      />
      <button className="px-5"><Send size={24} /></button>
    </div>
  );
}
