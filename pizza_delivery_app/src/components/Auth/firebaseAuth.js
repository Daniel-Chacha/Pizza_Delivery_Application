// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import firebaseConfig from "../../firebaseConfig";
import { getAuth, GoogleAuthProvider, signInWithPopup,signInWithEmailAndPassword, createUserWithEmailAndPassword ,signOut} from "firebase/auth";
import { SaveUserDetails } from "../../Requests/requests";
// import firebase from "firebase/compat/app";

initializeApp(firebaseConfig);
const auth = getAuth();
const provider =new GoogleAuthProvider();

export default function googleAuth1(){
    try{
        const user =signUpAuth1()
        saving(user)

    }catch(error){
        console.error("An error occurred while authenticating", error)
    }
}

export  function googleAuth2 (email, password) {
    try{
        const user= signUpAuth2(email, password)
        saving(user)
    }catch(error){
        console.error("An error occurred while authenticating", error)
    }
}

export async function signUpAuth1(){
    //sign in with google
    const result = await signInWithPopup(auth, provider);
    const user= result.user; 
    return user
}

export async function signUpAuth2(email, password){
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    return user ;
}

export async function signInAuth(email, password){
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    return user ;
}


function saving(user){

    //Extract user details
    const fname = user.displayName ? user.displayName.split(" ")[0]: "N/A";
    const lname = user.displayName ? user.displayName.split(" ")[1] : fname;
    const email =user.email ;
    const profilePikUrl = user.photoURL;

    if(!fname || !lname || !email || !profilePikUrl){
        console.error('All fields are required')
    }else{
        SaveUserDetails(fname, lname, email, profilePikUrl)
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