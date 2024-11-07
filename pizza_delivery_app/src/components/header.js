


function Header({showMiniHeader = false}){
    return(
        <>
            <header className="fixed top-0 left-0 w-full z-10 ">
                <div className="h-16  bg-red-800 flex flex-row space-x-4 justify-center  items-center">
                    <img src="placeholder.com" alt="logo" className="basis-1/8 ml-10 rounded-e-full"></img>

                    <div className="  w-1/2  basis-3/4 ml-6 ">
                    <h1 className="text-7xl font-bold  text-white text-center max-[640px]:text-5xl " >Pizza Inn</h1>
                    
                    </div>
                    <img src="placeholder.com" alt="logo" className="basis-1/8 ml-10 rounded-e-full"></img> 
                </div>
                {showMiniHeader  && (
                            <div className="bg-white h-10">
                               <p>Custom Pizza</p>
                               <input type="search"></input>
                           </div>
                )}
     
            </header>
     
            
        </>
    )
};

export default  Header;