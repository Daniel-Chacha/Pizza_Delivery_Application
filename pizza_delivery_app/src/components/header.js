
import Btn from "./btn";
import { useState,useEffect, useRef, useContext } from "react";
import { UserContext } from "../userContext";


function Header({showMiniHeader = false, onCartClick , toggleCustomPizza, showMiniHeader2=false , onNotificationClick, onInventoryClick,  onOrderStatusClick, showProfile=false}){
    const {userDetails} = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const dropDownRef = useRef(null);

    userDetails.userId ? showProfile=true : showProfile=false ;  //check whether user details are in the context, and set showProfile to true
    
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
    return(
        <>
            <header className="fixed top-0 left-0 w-full z-10 ">
                <div className="h-16  bg-red-800 flex flex-row space-x-4 justify-center  items-center">
                    <img src="/public/pizzaInnlogo.png" alt="logo" className="basis-1/8 ml-10 rounded-e-full "></img>

                    <div className="  w-1/2  basis-3/4 ml-6 ">
                    <h1 className="text-7xl font-bold  text-white text-center max-[640px]:text-5xl " >Pizza Inn</h1>
                    {/* {showMiniHeader2 && (
                        <span className="text-7xl font-bold  text-white text-center max-[640px]:text-5xl ">ADMIN</span>
                    ) } */}
                    
                    </div>
                    {showProfile && (
                        <div className="relative inline-block text-left" ref={dropDownRef}>
                            <img src={userDetails.profilePikUrl} alt="profile " className="basis-1/8 ml-10 rounded-e-full w-12" onClick={toggleDropdown}></img> 

                            {/* dropdown menu */}
                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border-gray-200 rounded-md shadow-lg z-30">
                                    <ul className="py-1">
                                        <li className="px-4 py-2 hover:bg-gray-100 text-gray-700 cursor-pointer ">{userDetails.fname}  {userDetails.lname}</li>
                                        <li className="px-4 py-2 hover:bg-gray-100 text-gray-700 cursor-pointer ">{userDetails.email}</li>
                                        <li className="px-4 py-2 hover:bg-gray-100 text-gray-700 cursor-pointer ">Settings</li>
                                        <li className="px-4 py-2 hover:bg-gray-100 text-gray-700 cursor-pointer ">Log Out</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        
                    )}
                    
                </div>
                {showMiniHeader  && (
                            <div className="bg-white h-12 flex flex-row justify-around p-1">
                               {/* <p>Custom Pizza</p> */}
                               <Btn  name={"Make My Pizza"}  onClick={toggleCustomPizza}/>
                               <input className="w-96 rounded-2xl  bg-slate-200 p-4" type="search"  placeholder="      Search..."></input>
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