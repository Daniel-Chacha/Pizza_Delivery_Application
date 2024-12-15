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
        // alert(response.data.message)

        console.log( response.data.message, response.data.user);
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
        const response= await axios.get(`http://localhost:4000/api/get-user-details?email=${encodeURIComponent(email)}`);
        return response.data;


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