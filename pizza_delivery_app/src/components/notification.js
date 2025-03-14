

export default  function  NotificationCard( {toggleNotification} ){
        return(
            <>
                <div className=" z-20  w-96  bg-white p-12  pt-3 pb-3 shadow-lg rounded-lg  h-fit ">
                    <h2 className="text-2xl font-bold text-center">MY  NOTIFICATION </h2>
                    <span className="absolute top-0 right-2  cursor-pointer" onClick={toggleNotification}><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">	<path fill="black" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m4.3 14.3a.996.996 0 0 1-1.41 0L12 13.41L9.11 16.3a.996.996 0 1 1-1.41-1.41L10.59 12L7.7 9.11A.996.996 0 1 1 9.11 7.7L12 10.59l2.89-2.89a.996.996 0 1 1 1.41 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41" /></svg>  </span>
                    <hr></hr>

                </div>
            </>
        )
}