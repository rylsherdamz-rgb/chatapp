'use client'

import React, {  createContext, useState } from "react";



export interface AuthContextType {
    username : string
    setUsername : React.Dispatch<React.SetStateAction<string>>
    room : string 
    setRoom : React.Dispatch<React.SetStateAction<string  >>
    userId : string
    setUserId : React.Dispatch<React.SetStateAction<string  >>
    messages :  string[]
    setMessages: React.Dispatch<React.SetStateAction<string[]  >>

}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default function AuthContextProvider({children}: {children : React.ReactNode}) {
    const [username, setUsername] = useState<string>("")  
    const [room, setRoom] = useState<string>("")
    const [userId, setUserId] = useState<string>("") 
    const [messages, setMessages] = useState<string[]>([])
   return <AuthContext.Provider value={{username, setUsername, room, setRoom, userId, setUserId, messages, setMessages}}>
    {children}
   </AuthContext.Provider> 
}