// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import firebaseConfig from "../../firebaseConfig";
import { getAuth, GoogleAuthProvider, signInWithPopup,signInWithEmailAndPassword, createUserWithEmailAndPassword ,signOut} from "firebase/auth";
import { SaveUserDetails } from "../../Requests/requests";
import { FetchUserDetails } from "../../Requests/requests";

// import firebase from "firebase/compat/app";

initializeApp(firebaseConfig);
const auth = getAuth();
const provider =new GoogleAuthProvider();


export default async function googleAuth1(){    //Sign up with google and route to the dashboard
    try{
       
        const user =await signUpAuth1() // wait fot the signup process to complete
        
        await saving(user)
        console.log("Saved the User", user)
        
    }catch(error){
        console.error("An error occurred while authenticating", error)
    }
}

export  function googleAuth2 (fname, lname, email, password) {  //Sign up with email and password and redirect to dashboard
    try{
        
        const user= signUpAuth2(fname, lname, email, password)
        saving(user)
        console.log("Saved the User", user)
        
    }catch(error){
        console.error("An error occurred while authenticating", error)
    }
}

export async function signUpAuth1(){
    //sign in with google
    const result = await signInWithPopup(auth, provider);
    // const user= result.user; 
    const email = result.user.email;
    const user =FetchUserDetails(email);
    return user
    
}

export async function signUpAuth2(fname, lname,email, password){
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const profilePikUrl =  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN8AAACUCAMAAAAkuAyxAAAAaVBMVEX///8AAADy8vJJSUn8/Pz19fWIiIgEBASjo6P5+fmenp7o6Oji4uKtra3u7u7W1taWlpYPDw+0tLRwcHBdXV2AgIBjY2NBQUGPj48uLi4oKCjc3Ny+vr4eHh4XFxfLy8s3NzdTU1N4eHhD685SAAAEw0lEQVR4nO2ca3eyMAzHWygiyB25CEyU7/8hn7boprtgyyOGePrb2ZuxnZO/SZOSpiPEYDAYDAaDwWAwGAwGg8FgMMDBmPxmxHMcK+JfjuPJHwugjftvmNRHPGsXh0VpV1Vll0XY7hz508tTvEjfMScKC5fe4hZZ5BHs6ogU6MWbVGpyR40XpR9J7BHsIcpXXeTTez49mfqWWJdI4Z7h68vL6ATHzpNLFNrWOYjQY7vNjb9+wJ/UEf8MiAdt7AxE+g8qsez+9h9/dA4IVv+RvqJT7hsf2jHB6T8SP5QnnWu30KbqwuRXe5qU9oW9Q5ZjZFWLcveB864hmuYWQoH1UdF9Lj0mBNdmlJvaH+ijxXeRx9fgIRa1Eg+MWKWITrX45DuZ3MG0F+WWbhvF6BxpMmibdeDu22vJo3TvQButRXjQ1HdA5UCSq6y8W9IBU4EIbE15ssjjgWcXPQfyEhFCG61BkWrq46+CG2ij1Yl0s6egtKDNVqa1td3nUjuANlsZ/t6nr6+Koc1WRrv6CU4dtNnKaG7ORhAlUH+OvmYLbbYyycd7+29efOLZgWZvnl9EX1C3QNCqhzZbmVZ/ez02epHw7vszVqj2zr7AtL+es4FBlD75Aqy09aF6vyV5qikvHaBN1oCRTjdAefXD039hMoO6av1d2QZ2S0z9QcZI1ojGu5o+0aDPMJ1ycn0OX4HK+mR/HhHiKKE/KZ4/iF/i7+6Ijh9GasUeGv+lo49u1IenGNEkdKfnC8bkkhYRptV3JSilcyb0uePDElVpv8JIvKfT70njAi3xNM7uYKQv6WSSkc+wyhMnzm0+6UHxJEc3HXJLWx8uQtzvwiSHpEWYWW6wsv1XIrnTJ5dehqqu/4R5JPbP9277VHr2Y4x14RZRtb3eL5sf+prS73EN9fwNi7N6f9sTPezrTKRNhnGw7jvSR1bchf5myPN82PhhF1vkc/b8bWDRLmiDXfRWon7lvfx24TpBJweXgW1ZlDfwHtMrbMgEzzMXj8h5VU3T59B4jjrIynzEi/k2qTeq1Mk2G0v+erkmRafNkmFvHz5S9RNON21O9n5IssD7jNFVhaqoaFKg1dXlnMPpkVOedM46LyRJm6KsqHQPVu5J7U0XrfE+CxO+G8YbHdpH7xfGv6sK4cP1bQKCWl7HUT11+F2fbJjayW5FEXr5oLt8zlDP73zkHbvcbQUWd7kHTaxQ/8R2Cjv0xqQFLW+8+r2r5yfN3zmNMboCfR6Xt3lebEr4MvyoozW4T9jwdHky1TRJtAL3ibsqs8YFH9P4DrxANnNaV4WTHImBC1Imv/vzQvIoPfeg9wJl6pRHKIvgUncIIDej8qP1/2/DOY04uAaELRqdgjPwUKi1WVQedWvYA6buuduyn9g9ZI1Y2n2cGu5dUE4QzH0ZUgX0eH6rfw9OD5ceAa99RMOD6Z0n6KMFXF+tnzMnrwtgiQjn3FPRgodHA3Zvx6qXliclJlAlcDe8Qh8doMbT4jnXOPQBqxDdg/+u9CRsqAQTLvPe/h2wmx/b+a1qHY5QCfT7P6ZbCqgdzEv0uW+ujxp9qPXBxucLyt97+881+WUxwsp+CVD7F896DeubNjAYDAaDwWAwGAwGg8FgMBjeg38MpUJF98eMVQAAAABJRU5ErkJggg==";
    
    verifyAndSave(fname, lname, email, profilePikUrl)

    const user = result.user;
    return user ;
}

export async function signInAuth(email, password){
    try{
        const result = await signInWithEmailAndPassword(auth, email, password);
        // const user = result.user;
        const user =FetchUserDetails(email);
        return user ;
    }catch(error){
        handleFirebaseAuthError(error);
    }
}


function saving(user){
    //Extract user details
    const [firstname, lastname] = user.displayName ? user.displayName.split(" ") : ["N/A", "N/A"];
    const fname = firstname || "N/A";
    const lname = lastname || "N/A";
    const email =user.email ;
    const profilePikUrl = user.photoURL || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN8AAACUCAMAAAAkuAyxAAAAaVBMVEX///8AAADy8vJJSUn8/Pz19fWIiIgEBASjo6P5+fmenp7o6Oji4uKtra3u7u7W1taWlpYPDw+0tLRwcHBdXV2AgIBjY2NBQUGPj48uLi4oKCjc3Ny+vr4eHh4XFxfLy8s3NzdTU1N4eHhD685SAAAEw0lEQVR4nO2ca3eyMAzHWygiyB25CEyU7/8hn7boprtgyyOGePrb2ZuxnZO/SZOSpiPEYDAYDAaDwWAwGAwGg8FgMMDBmPxmxHMcK+JfjuPJHwugjftvmNRHPGsXh0VpV1Vll0XY7hz508tTvEjfMScKC5fe4hZZ5BHs6ogU6MWbVGpyR40XpR9J7BHsIcpXXeTTez49mfqWWJdI4Z7h68vL6ATHzpNLFNrWOYjQY7vNjb9+wJ/UEf8MiAdt7AxE+g8qsez+9h9/dA4IVv+RvqJT7hsf2jHB6T8SP5QnnWu30KbqwuRXe5qU9oW9Q5ZjZFWLcveB864hmuYWQoH1UdF9Lj0mBNdmlJvaH+ijxXeRx9fgIRa1Eg+MWKWITrX45DuZ3MG0F+WWbhvF6BxpMmibdeDu22vJo3TvQButRXjQ1HdA5UCSq6y8W9IBU4EIbE15ssjjgWcXPQfyEhFCG61BkWrq46+CG2ij1Yl0s6egtKDNVqa1td3nUjuANlsZ/t6nr6+Koc1WRrv6CU4dtNnKaG7ORhAlUH+OvmYLbbYyycd7+29efOLZgWZvnl9EX1C3QNCqhzZbmVZ/ez02epHw7vszVqj2zr7AtL+es4FBlD75Aqy09aF6vyV5qikvHaBN1oCRTjdAefXD039hMoO6av1d2QZ2S0z9QcZI1ojGu5o+0aDPMJ1ycn0OX4HK+mR/HhHiKKE/KZ4/iF/i7+6Ijh9GasUeGv+lo49u1IenGNEkdKfnC8bkkhYRptV3JSilcyb0uePDElVpv8JIvKfT70njAi3xNM7uYKQv6WSSkc+wyhMnzm0+6UHxJEc3HXJLWx8uQtzvwiSHpEWYWW6wsv1XIrnTJ5dehqqu/4R5JPbP9277VHr2Y4x14RZRtb3eL5sf+prS73EN9fwNi7N6f9sTPezrTKRNhnGw7jvSR1bchf5myPN82PhhF1vkc/b8bWDRLmiDXfRWon7lvfx24TpBJweXgW1ZlDfwHtMrbMgEzzMXj8h5VU3T59B4jjrIynzEi/k2qTeq1Mk2G0v+erkmRafNkmFvHz5S9RNON21O9n5IssD7jNFVhaqoaFKg1dXlnMPpkVOedM46LyRJm6KsqHQPVu5J7U0XrfE+CxO+G8YbHdpH7xfGv6sK4cP1bQKCWl7HUT11+F2fbJjayW5FEXr5oLt8zlDP73zkHbvcbQUWd7kHTaxQ/8R2Cjv0xqQFLW+8+r2r5yfN3zmNMboCfR6Xt3lebEr4MvyoozW4T9jwdHky1TRJtAL3ibsqs8YFH9P4DrxANnNaV4WTHImBC1Imv/vzQvIoPfeg9wJl6pRHKIvgUncIIDej8qP1/2/DOY04uAaELRqdgjPwUKi1WVQedWvYA6buuduyn9g9ZI1Y2n2cGu5dUE4QzH0ZUgX0eH6rfw9OD5ceAa99RMOD6Z0n6KMFXF+tnzMnrwtgiQjn3FPRgodHA3Zvx6qXliclJlAlcDe8Qh8doMbT4jnXOPQBqxDdg/+u9CRsqAQTLvPe/h2wmx/b+a1qHY5QCfT7P6ZbCqgdzEv0uW+ujxp9qPXBxucLyt97+881+WUxwsp+CVD7F896DeubNjAYDAaDwWAwGAwGg8FgMBjeg38MpUJF98eMVQAAAABJRU5ErkJggg==";

    try{
       verifyAndSave(fname, lname, email, profilePikUrl);
    }catch(error){
        console.error("Error while verifying and saving user,", error);
    } 
    
}

async function verifyAndSave(fname,lname, email,profilePikUrl){
    if(!fname || !lname || !email || !profilePikUrl){
        console.error('All fields are required')
    }else{
        try{
            await SaveUserDetails(fname, lname, email, profilePikUrl)
            console.log("User successfully saved", {fname, lname, email, profilePikUrl})
        }catch(error){
            console.error("Failed to save user details", error);
            throw error;
        }
        
    }
    
    console.log("User Details:", fname, lname, email, profilePikUrl)
}


export const logoutUser = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };


function handleFirebaseAuthError(error){
    const errorMessage = getErrorMessage(error.code);
    console.error("Firebase Authentication error");

    alert(errorMessage);
}

function getErrorMessage(code){
    switch(code){
        case("auth/invalid-credential"):
            return "The provided credentials are invalid. Please try signing in again." ;
        case ("auth/user-not-found"):
            return "No user found with the provided email. Please check your email and try again.";
        case ("auth/wrong-password"):
            return "The password is incorrect please try again."
        case ("auth/network-request-failed"):
            return "Network error occurred .Please check your internet connection and try again."
        case ("auth/email-already-in-use"):
            return "Email already in use."
        default:
            return "An error occurred during authentication.Please try again"; 
    }
}
