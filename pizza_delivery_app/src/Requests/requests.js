import axios from "axios";
// import { UserContext  } from "../userContext";
// import { useContext } from "react";


//Function to send registration data to the backend for saving to database
export const SaveUserDetails = async(fname, lname, email, profilePikUrl) => {
    // const {userId,setUserId} = useContext(UserContext);
    try{
        //creating payload to send to the backend
        const userData ={
            fname,lname,email,profilePikUrl,
        };

        const response = await axios.post('https://pizza-delivery-backend-59oi.onrender.com/signup', userData);
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

//Function for fetching user data from the backend
export const FetchUserDetails = async(email) =>{
    // const {setUserId} =useContext(UserContext);
    try{
        const response= await axios.get(`https://pizza-delivery-backend-59oi.onrender.com/api/get-user-details?email=${encodeURIComponent(email)}`);
        return response.data;


    }catch(error){
        console.error("Error fetching user Details: ", error);
    }
}

//fetch pizza details from the backend to display at the dashboard
export const FetchPizzas = async() =>{
    try{
        // const data =await axios.get("https://pizza-delivery-backend-59oi.onrender.com/api/pizzas");
        // return data;
        const response =await fetch("https://pizza-delivery-backend-59oi.onrender.com/api/pizzas");
        const data =await response.json();
        return data;
    }catch(error){
        console.error("Error getting pizza details from the backend: ", error);
    }
}

//Function for saving pizzas addded to cart to the database.
export const SaveToCart = async(orderItems) =>{
    try{
        const response= await axios.post("https://pizza-delivery-backend-59oi.onrender.com/api/add-to-cart",orderItems )
        console.log("ORDER ITEMS: ", orderItems);
        return response;
    }catch(error){
        console.error("Error saving details to Cart", error);
        throw error;
    }
}

//Function for fetching data in the Cart collection
export const FetchCartData = async(userId) =>{
    try{
        
        const id= encodeURIComponent(userId);
        console.log("User Id in Cart: ",id, userId);
        const response = await axios.get(`https://pizza-delivery-backend-59oi.onrender.com/api/get-user-cart-data?userId=${id}`);
        console.log("The Cart details are: ",response.data);
        return response.data;
        
    }catch(error){
        console.error("Internal server error. ", error);
    }
}