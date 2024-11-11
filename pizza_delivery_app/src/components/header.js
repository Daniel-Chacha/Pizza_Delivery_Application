
import Btn from "./btn";



function Header({showMiniHeader = false, onCartClick , toggleCustomPizza, }){
    
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
                            <div className="bg-white h-12 flex flex-row justify-around p-1">
                               {/* <p>Custom Pizza</p> */}
                               <Btn  name={"Make My Pizza"}  onClick={toggleCustomPizza}/>
                               <input className="w-96 rounded-2xl  bg-slate-200 p-4" type="search"  placeholder="      Search..."></input>
                               {/* <i  className="fas fa-shopping-cart text-2xl  text-black"></i> */}
                               <img className="w-24 cursor-pointer  " onClick={ onCartClick } src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPgoJPGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuNSI+CgkJPHBhdGggZmlsbD0iYmxhY2siIGQ9Ik0xOS41IDIyYTEuNSAxLjUgMCAxIDAgMC0zYTEuNSAxLjUgMCAwIDAgMCAzbS0xMCAwYTEuNSAxLjUgMCAxIDAgMC0zYTEuNSAxLjUgMCAwIDAgMCAzIiAvPgoJCTxwYXRoIGQ9Ik0xNi41IDRIMjJsLTIgMTFoLTQuNW0xLTExbC0xIDExbTEtMTFoLTUuNzVtNC43NSAxMWgtNG0tLjc1LTExSDVsMiAxMWg0LjVtLS43NS0xMWwuNzUgMTFNNSA0Yy0uMTY3LS42NjctMS0yLTMtMm0xOCAxM0g1LjIzYy0xLjc4NCAwLTIuNzMuNzgxLTIuNzMgMnMuOTQ2IDIgMi43MyAySDE5LjUiIC8+Cgk8L2c+Cjwvc3ZnPg=="  alt="addto cart icon"></img>
                           </div>
                )}
     
            </header>
     
            
        </>
    )
};

export default  Header;