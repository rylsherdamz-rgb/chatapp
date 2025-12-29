import { AuthContext } from "@/context/chatProfileContext"
import { useContext } from "react"
import { useEffect } from "react"


export default function MessageContext() {
    const context = useContext(AuthContext)
    if (!context) return;
    const {messages, username} = context
    return <div className="w-full h-full ">
        { messages ? 
            messages.map((message, index) => (
            <div className="">
                
            </div>   
            )) : (
                <div className="">No Message</div>
            )
        }
        
    </div>
}