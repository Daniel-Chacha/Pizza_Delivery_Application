import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { SignBtn } from "./sign_btn";
import Btn from "./btn";
import googleAuth1 from "./Auth/firebaseAuth";
import {googleAuth2} from  "./Auth/firebaseAuth";
import { signInAuth } from "./Auth/firebaseAuth";
import { signUpAuth1 } from "./Auth/firebaseAuth";
// import { signUpAuth2 } from "./Auth/firebaseAuth";

export default function SignForm(  {formTitle,  ask ,showRepeatPassword}){
    const navigate = useNavigate()
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword ]= useState("")

    const Authenticate= () =>{
        try{
            console.log("Starting")
            if(password === repeatPassword){
                if (showRepeatPassword === true){ 
                    console.log("Sent to requests.js")          //signing up manually
                    googleAuth2(fname, lname ,email, password)
                    console.log("Finish1")
                    navigate("/dashboard")
                }else{
                    signInAuth(email, password)             //signing in manually
                    navigate("/dashboard");
                }
                
            }else{
                console.error("passwords not similar.")
            }
            
        }catch(error){
            console.error("An error occurred", error)
        }

    }

    const googleAuthentication =() =>{
        try{
            if (showRepeatPassword === true){   //signing up with google 
                googleAuth1()
                navigate("/dashboard")
            }else{                              //signing in with google
                signUpAuth1()
                navigate("/dashboard");
            }
                
          
        }catch(error){
            console.error("An error occurred", error)
        }
    }

    const handleSubmit =(e) =>{
        e.preventDefault()
        console.log("Form submitted")
        Authenticate()
        console.log("Authenticated")
    }
   
    //redirect function for  Sign Up  botton click
    const handleSignClick =(event, location) =>{
        event.preventDefault();
        navigate(location)
    }

    function display(){
        if (ask === "Already"){
           return(
                 <SignBtn onClick={(event) => handleSignClick(event,  "/signin")} btnName= "Sign In"  />
           )
        }else{
            return(
                <SignBtn onClick={(event) => handleSignClick(event,  "/signup")} btnName="Sign Up" />
            )
        }
    }
    return(
        <>
            <div className="flex flex-col bg-white xl:ml-96 xl:mr-96 justify-center  mb-10 rounded-md max-sm:ml-8 max-sm:mr-8  sm:ml-56  sm:mr-56">
                {/* <h2 className="text-center "> {formTitle} </h2> */}
                <p className="text-center p-4">{formTitle} with... </p>

                <div className=" flex gap-5  mb-5 justify-center  ">
                    <div onClick={googleAuthentication}>
                        <img className="w-10 h-10  cursor-pointer"  src="data:image/png;base64,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" alt="google logo"></img>
                        <p>Google</p>
                    </div>
                    <div>
                        <img className="w-10 h-10 cursor-pointer" src="data:image/png;base64,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" alt="facebook logo"></img>
                        <p>Facebook</p>
                    </div>
                    <div>
                        <img className="w-10 h-10 cursor-pointer" src="data:image/png;base64,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" alt="apple logo"></img>
                        <p>Apple</p>
                    </div>
                    <div>
                        <img className="w-10 h-10  cursor-pointer" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEXz8/PzUyWBvAYFpvD/ugjz9fb19Pbz+fr39fr69vPy9frzRQB5uAAAofD/tgDz2tTh6tHzTBfzmYWw0Xx8xfH70H3R5vP16dHz4+Dn7d3zPQDzk36sz3Td6/N0wvH7znX07d4AnvDzvLHK3qur1vL43qu/SIryAAABeUlEQVR4nO3cSW7CUBBFUdKY3pi+NTaQZP9bzCQ2kfhSRmUyOHcDpaOav15PkiT9KguvPdUPLyksots3xP5hHl3qg8VxEtvxNPi5NSyn0c0fv5gVk5fYFstWuHoNjpCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkLBb4XER2+QuLKfPEO5Py+BuzQbt8KNcxVYeEju72SC6+47wMLz0kLAkSX82Cq89NQ4vSwDP1Tq26rMhjr/qTWz1JUHcXvPgqlZYz6LbpYT5W2z5uhVuZu+xERISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEnYrjN4vvT57vzTbRnduT1120Y0egZ2WhfdkoCRJ/6xv7S5GMPm5T6AAAAAASUVORK5CYII=" alt="microsoft logo"></img>
                        <p>Microsoft</p>
                    </div>
                </div>

                <p  className="text-center">OR</p>

                <div className="flex  items-center  justify-center">
                    <form  className="items-center p-8 rounded-lg  w-full  max-w-md " onSubmit={handleSubmit}>
                        {showRepeatPassword && (
                            <>
                        <label className=" text-gray-700  " htmlFor="fname">First Name:</label>
                        <input onChange={(e) =>setFname(e.target.value)} className=" border border-gray-300 rounded lg:ml-14 mb-5 max-sm:w-50  max-sm:ml-1  sm:ml-16" type="text" id="fname" required autoComplete="True"></input>  <br></br>
                        <label className=" text-gray-700  " htmlFor="lname">Last Name:</label>
                        <input onChange={(e) =>setLname(e.target.value)} className=" border border-gray-300 rounded lg:ml-14 mb-5 max-sm:w-50  max-sm:ml-1  sm:ml-16" type="text" id="lname" required autoComplete="True"></input>  <br></br>
                            </>
                        )}
                        <label className=" text-gray-700  " htmlFor="email">Email:</label>
                        <input onChange={(e) =>setEmail(e.target.value)} className=" border border-gray-300 rounded lg:ml-24 mb-5 max-sm:w-50  max-sm:ml-1  sm:ml-16" type="email" id="email" required autoComplete="True"></input>  <br></br>

                        <label className=" text-gray-700" htmlFor="password">Password:</label>
                        <input onChange= {(e) => setPassword(e.target.value)} className="border border-gray-300 rounded lg:ml-16 mb-5 max-sm:ml-0 sm:ml-16" type="password" id="password " required autoComplete="True"></input>  <br></br>

                        {showRepeatPassword && (
                            <>
                        <label className=" text-gray-700" htmlFor="confirm">Repeat Password:</label>
                        <input onChange= {(e) => setRepeatPassword(e.target.value)} className="border border-gray-300 rounded lg:ml-3 mb-5 max-sm:ml-0 sm:ml-16" type="password" id="confirm" required autoComplete="True"></input>  <br></br>
                            </>
                        ) }

                        <Btn name={formTitle} type="submit" />
                    </form>

                </div>
                <p className="text-center">{ask}  have an account?   { display()}</p>    
                
            </div>
    
        </>
    )
}