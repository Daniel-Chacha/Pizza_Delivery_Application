import React, { createContext, useState} from "react";

//create the context
export const UserContext =createContext();

//create  a provider component
export const UserProvider= ({children}) =>{
    const [userId, setUserId] = useState(null) // hold the user's id in state

    return(
        <UserContext.Provider value={{userId, setUserId}}>
            {children}
        </UserContext.Provider>
    )
}