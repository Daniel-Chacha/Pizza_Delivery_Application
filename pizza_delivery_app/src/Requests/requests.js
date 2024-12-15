import axios from "axios";
// import { UserContext  } from "../userContext";
// import { useContext } from "react";

export const SaveUserDetails = async(fname, lname, email, profilePikUrl) => {
    // const {userId,setUserId} = useContext(UserContext);
    try{
        //creating payload to send to the backend
        const userData ={
            fname,lname,email,profilePikUrl,
        };

        const response = await axios.post('http://localhost:4000/signup', userData);

        console.log("User successfully saved", response.data);
        // setUserId(response._id)
      
        return(response.data)
    }catch (error){
        //handle errors such as network issues or validation errors from the server
        console.error('Error saving user details:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export const FetchUserDetails = async(email) =>{
    // const {setUserId} =useContext(UserContext);
    try{
        const response= await axios.post("http://localhost:4000/api/get-user-details", {email});
        return response.data;

        // if (response.ok){
        //     setUserId(response._id) // update the user id state with the id
        // }else{
        //     alert(response.error);  //show an error message if the user is not found.
        // }
    }catch(error){
        console.error("Error fetching user Details: ", error);
    }
}

// export const getPizzaDetails =async() =>{
//     try{
//         const response = await axios.post('http://localhost:4000/signup');
//         return(response);
//     }catch(error){
//         console.error("Error retrieving ready pizza details from the server ", error);
        
//     }
// }