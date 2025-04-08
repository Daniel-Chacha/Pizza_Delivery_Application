import { SignBtn } from "./sign_btn";
import { useNavigate } from "react-router-dom";

export const ErrorPopUp =({isOpen, onClose, message=null, showPassedMessage=false, showSignInUpMessage=false}) =>{
   const navigate = useNavigate();
    if (!isOpen) return null; // Don't render if not open
      
    //redirect function for  Sign Up  botton click
    const handleSignClick =(event  , location) =>{
        event.preventDefault();
        navigate(location)
    }

    return (
      <div className="fixed inset-0 flex items-start justify-center  bg-black bg-opacity-30">
        <div className="bg-white p-4 rounded-lg shadow-lg w-80 relative mt-[10%]">
          {/* Close Button (X) */}
          <button
            className="absolute top-1 right-1 text-red-600 hover:bg-slate-300 text-2xl rounded-full h-8 w-8"
            onClick={onClose}
          >
            ✖
          </button>
  
          {/* Message */}
          {showPassedMessage && (
            <p className="text-lg font-semibold text-center text-blue-800">
              {message}
            </p>
          )}

          {showSignInUpMessage && (
            <h2 className="font-semibold text-center"> Please
                <span>
                <SignBtn onClick={(event) => handleSignClick(event,  "/signin")} btnName= "Sign In"/>
                </span> or
                
                <span>
                <SignBtn onClick={(event) => handleSignClick(event,  "/signup")} btnName="Sign Up"  />
                </span>
                
                  to be able to add items to cart.
            </h2>
          )}

          {/* {showLoadingIcon && (
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity="0.5"/><path fill="#000" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"/></path></svg>
              <p>Loading ...</p>
            </div>
          )} */}

        </div>
      </div>
    )
}