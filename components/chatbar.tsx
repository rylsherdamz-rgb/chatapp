import {useState} from "react"

export default function ChatBar() {


  const [message, setMessage] = useState<string | null >("")
  
 
  const trackMessage = () => {

  }

  const sendMessage = () => {
  
  }
  
  return (
    <div className="w-full mx-5 my-2 border rounded-xl bg-gray-100">
      <input >
    </div>
  );
}
