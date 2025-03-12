
import Btn from "./btn";
import { useState,useEffect, useRef, useContext } from "react";
import { UserContext } from "../userContext";
import { SignBtn } from "./sign_btn";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

function Header({showMiniHeader = false, onCartClick , toggleCustomPizza, showMiniHeader2=false , onNotificationClick, onInventoryClick,  onOrderStatusClick, showProfile=false, background_color='bg-red-800' ,underline = false } ){
    const {userDetails, setUserDetails} = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const dropDownRef = useRef(null);
    const auth =getAuth()

    // userDetails.userId ? showProfile=true : showProfile=false ;  //check whether user details are in the context, and set showProfile to true
    const data =sessionStorage.getItem('UserCredentials')
    data ? showProfile =true : showProfile=false
    //Toggle dropdown visibility
    const toggleDropdown =() =>{
        setIsOpen((prev) =>!prev);
    }

    //close the  dropdown after clicking outside
    useEffect(() =>{
        const handleClickOutside =(event) =>{
            if(dropDownRef.current && !dropDownRef.current.contains(event.target)){
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return() =>{
            document.removeEventListener("mousedown", handleClickOutside);
        }
    },[]);

        const navigate = useNavigate();
    
        //redirect function for  Sign Up  botton click
        const handleSignClick =(event  , location) =>{
            event.preventDefault();
            navigate(location)
        }

        //log out the user
        const logOutUser =async()=>{
            try {
                await signOut(auth);
                sessionStorage.removeItem('UserCredentials')
                showProfile= false
                setUserDetails(null)
                navigate('/')
                // window.location.reload()        //refresh the page thus removing the data in context state
                console.log("User logged out");
            } catch (error) {
                console.error("Error logging out:", error.message);
            }
        }
    return(
        <>
            <header className="fixed top-0 left-0 w-full z-10 ">
                <div className={`h-16  ${background_color} flex flex-row space-x-4 justify-center  items-center`}>
                    {/* <img src="/public/pizzaInnlogo.png" alt="logo" className="basis-1/8 ml-10 rounded-e-full "></img> */}

                    <div className="relative  w-1/2  basis-3/4 ml-6 ">
                        <h1 className={`text-7xl font-bold  ${underline ? "underline underline-offset-[10px] decoration-2 decoration-dashed" : ""}  text-white text-center max-[640px]:text-5xl pacifico-regular`} >Pizza Inn</h1>

                        {!showProfile && (
                            <div className="hidden sm:block absolute right-0 top-5  gap-5 justify-center">
                                <SignBtn onClick={(event) => handleSignClick(event,  "/signup")} btnName="Sign Up"  />
                                <SignBtn onClick={(event) => handleSignClick(event,  "/signin")} btnName= "Sign In"/>
                            </div>
                        )}
                    
                    </div>
                    {showProfile && (
                        <div className="relative inline-block text-left" ref={dropDownRef}>
                            <img src={userDetails.profilePikUrl} alt="profile " className="basis-1/8 ml-10 rounded-e-full w-12" onClick={toggleDropdown}></img> 

                            {/* dropdown menu */}
                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border-gray-200 rounded-md shadow-lg z-30">
                                    <ul className="py-1">
                                        <li className="px-4 py-2 hover:bg-gray-100 text-gray-700 cursor-pointer ">
                                            <span><svg xmlns="http://www.w3.org/2000/svg" className="inline" width="23" height="23" viewBox="0 0 26 26"><path fill="#0b14cd" d="M16.563 15.9c-.159-.052-1.164-.505-.536-2.414h-.009c1.637-1.686 2.888-4.399 2.888-7.07c0-4.107-2.731-6.26-5.905-6.26c-3.176 0-5.892 2.152-5.892 6.26c0 2.682 1.244 5.406 2.891 7.088c.642 1.684-.506 2.309-.746 2.397c-3.324 1.202-7.224 3.393-7.224 5.556v.811c0 2.947 5.714 3.617 11.002 3.617c5.296 0 10.938-.67 10.938-3.617v-.811c0-2.228-3.919-4.402-7.407-5.557"/></svg></span>
                                             {userDetails.fname}  {userDetails.lname}</li>
                                        <li className="px-4 py-2 hover:bg-gray-100 text-gray-700 cursor-pointer ">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="inline" width="24" height="24" viewBox="0 0 24 24"><path fill="#0b14cd" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4l-8 5l-8-5V6l8 5l8-5z"/></svg>
                                            {userDetails.email}</li>
                                        <li className="px-4 py-2 hover:bg-gray-100 text-gray-700 cursor-pointer ">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="inline" width="24" height="24" viewBox="0 0 24 24"><path fill="#0b14cd" d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zm2.8-6.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5"/></svg>
                                            Settings</li>
                                        <li className="px-4 py-2 hover:bg-gray-100 text-gray-700 cursor-pointer "> 
                                            <button onClick={logOutUser}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="inline" width="24" height="24" viewBox="0 0 24 24"><path fill="#0b14cd" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m5-6l5-4l-5-4v3H9v2h8z"/></svg>
                                            Log Out
                                            </button>
                                            </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        
                    )}
                    
                </div>
                {showMiniHeader  && (
                            <div className="bg-white h-12 flex flex-row justify-around p-1">
                               {/* <p>Custom Pizza</p> */}
                               <Btn  name={"Make My Pizza"}  onClick={toggleCustomPizza}  />
                               {/* <input className="w-96 rounded-2xl  bg-slate-200 p-4 " type="search"  placeholder="      Search..."></input> */}
                               {/* <i  className="fas fa-shopping-cart text-2xl  text-black"></i> */}
                               <img className="w-24 cursor-pointer  " onClick={ onCartClick } src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPgoJPGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuNSI+CgkJPHBhdGggZmlsbD0iYmxhY2siIGQ9Ik0xOS41IDIyYTEuNSAxLjUgMCAxIDAgMC0zYTEuNSAxLjUgMCAwIDAgMCAzbS0xMCAwYTEuNSAxLjUgMCAxIDAgMC0zYTEuNSAxLjUgMCAwIDAgMCAzIiAvPgoJCTxwYXRoIGQ9Ik0xNi41IDRIMjJsLTIgMTFoLTQuNW0xLTExbC0xIDExbTEtMTFoLTUuNzVtNC43NSAxMWgtNG0tLjc1LTExSDVsMiAxMWg0LjVtLS43NS0xMWwuNzUgMTFNNSA0Yy0uMTY3LS42NjctMS0yLTMtMm0xOCAxM0g1LjIzYy0xLjc4NCAwLTIuNzMuNzgxLTIuNzMgMnMuOTQ2IDIgMi43MyAySDE5LjUiIC8+Cgk8L2c+Cjwvc3ZnPg=="  alt="addto cart icon"></img>
                           </div>
                )}
                { showMiniHeader2 && (
                    <div className="bg-blue-950 h-12 flex flex-row justify-around p-1 text-white font-bold">
                        <p  className="cursor-pointer" onClick={onInventoryClick}> <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="white" d="M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-1-2-2-2m-5 12H9v-2h6zm5-7H4V4l16-.02z" /></svg>Inventory</p>
                        <p className="cursor-pointer" onClick={onOrderStatusClick}> <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="white" d="m17.275 20.25l3.475-3.45l-1.05-1.05l-2.425 2.375l-.975-.975l-1.05 1.075zM6 9h12V7H6zm12 14q-2.075 0-3.537-1.463T13 18t1.463-3.537T18 13t3.538 1.463T23 18t-1.463 3.538T18 23M3 22V3h18v8.675q-.7-.35-1.463-.513T18 11H6v2h7.1q-.425.425-.787.925T11.675 15H6v2h5.075q-.05.25-.062.488T11 18q0 1.05.288 2.013t.862 1.837L12 22l-1.5-1.5L9 22l-1.5-1.5L6 22l-1.5-1.5z" /></svg> Order Status</p>
                        <p className="cursor-pointer  " onClick={onNotificationClick }><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36"><path fill="white" d="m32.85 28.13l-.34-.3A14.4 14.4 0 0 1 30 24.9a12.6 12.6 0 0 1-1.35-4.81v-4.94A10.81 10.81 0 0 0 19.21 4.4V3.11a1.33 1.33 0 1 0-2.67 0v1.31a10.81 10.81 0 0 0-9.33 10.73v4.94a12.6 12.6 0 0 1-1.35 4.81a14.4 14.4 0 0 1-2.47 2.93l-.34.3v2.82h29.8Z" class="clr-i-solid clr-i-solid-path-1" /><path fill="white" d="M15.32 32a2.65 2.65 0 0 0 5.25 0Z" class="clr-i-solid clr-i-solid-path-2" /><path fill="none" d="M0 0h36v36H0z" /></svg> Notifications</p>
                    </div>
                ) }
   
            </header>
     
            
        </>
    )
};

export default  Header;