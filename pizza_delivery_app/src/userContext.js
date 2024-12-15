import React, { createContext, useState} from "react";

//create the context
export const UserContext =createContext();

//create  a provider component
export const UserProvider= ({children}) =>{
    const [userDetails, setUserDetails] = useState({
        userId: null,
        email: "",
        fname: "",
        lname: "",
        profilePikUrl: "",
    }); // hold the user's id in state

    return(
        <UserContext.Provider value={{userDetails, setUserDetails}}>
            {children}
        </UserContext.Provider>
    )
}