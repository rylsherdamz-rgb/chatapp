'use client'
import React, {  createContext, useState } from "react";
export type Message = {
  id: string;
  text: string;
  userId: string;
  username: string;
  roomId: string;
  createdAt: number;
};
export interface AuthContextType {
    username : string
    setUsername : React.Dispatch<React.SetStateAction<string>>
    room : string 
    setRoom : React.Dispatch<React.SetStateAction<string  >>
    userId : string
    setUserId : React.Dispatch<React.SetStateAction<string  >>
    messages : Message[] 
    setMessages: React.Dispatch<React.SetStateAction<Message[]  >>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default function AuthContextProvider({children}: {children : React.ReactNode}) {
    const [username, setUsername] = useState<string>("")  
    const [room, setRoom] = useState<string>("")
    const [userId, setUserId] = useState<string>("") 
    const [messages, setMessages] = useState<Message[]>([])
   return <AuthContext.Provider value={{username, setUsername, room, setRoom, userId, setUserId, messages, setMessages}}>
    {children}
   </AuthContext.Provider> 
}