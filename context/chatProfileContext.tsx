import React, { Children, createContext, useState } from "react";

type user =  {
    id : string
    username : string
}



interface AuthContextType {
    username : user | null
    setUsername : React.Dispatch<React.SetStateAction<user | null>>
    room : string | null
    setRoom : React.Dispatch<React.SetStateAction<string | null>>
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined)

    const [username, setUsername] = useState<user | null>(null)  
    const [room, setRoom] = useState<string | null>(null)


export default function AuthContextProvider({children}: {children : React.ReactNode}) {
   return <AuthContext.Provider value={{username, setUsername, room, setRoom}}>
    {children}
   </AuthContext.Provider> 
}