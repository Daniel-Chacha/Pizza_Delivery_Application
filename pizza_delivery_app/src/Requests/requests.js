import axios from "axios";

export const SaveUserDetails = async(fname, lname, email, profilePikUrl) => {
    try{
        //creating payload to send to the backend
        const userData ={
            fname,lname,email,profilePikUrl,
        };

        const response = await axios.post('http://localhost:4000/signup', userData);

        console.log("User successfully saved", response.data);
        return(response.data)
    }catch (error){
        //handle errors such as network issues or validation errors from the server
        console.error('Error saving user details:', error.response ? error.response.data : error.message);
        throw error;
    }
}