import  React  from 'react';
import Header from "../components/header";
import Footer from "../components/footer";
// import {SignBtn} from  "../components/sign_btn"
// import { Services } from "../components/data";
import { useNavigate } from 'react-router-dom';

export default function LandingPage(){
    //state to keep track of the current  service index
    // const [index1, setIndex1] =useState(0);
    // const [index2, setIndex2] =useState(1);
    // const [index3, setIndex3] =useState(2);
    const navigate = useNavigate();

    //redirect function for  Sign Up  botton click
    const handleSignClick =(event  , location) =>{
        event.preventDefault();
        navigate(location)
    }

    // //effect to change the service after  every 5 seconds
    // useEffect(() =>{
    //     const interval =setInterval(() =>{
    //         setIndex1((prevIndex) => (prevIndex +1) % Services.length);
    //         setIndex2((prevIndex) =>(prevIndex + 1)%Services.length);
    //         setIndex3((prevIndex) =>(prevIndex +1)% Services.length);
    //     }, 4000);     //change content every 5 seconds 

    //     //cleanup interval on component unmount
    //     return() => clearInterval(interval);
    // }, []);

 
    return(
        <>
            <main className='App  min-h-screen flex flex-col'>
                <Header />
                <div className='flex-grow' >
                    <div className="h-screen bg-fixed  bg-no-repeat bg-cover bg-center bg-[url('https://img.freepik.com/premium-photo/colorful-homemade-pizza-with-black-ham-cherry-tomatoes_1126714-13131.jpg?ga=GA1.1.329323705.1719251145')]" >
                            <h2 className=' text-3xl  text-white pt-28 font-bold underline'>Your Ultimate Pizza Destination</h2>

                            <button
                            className="mt-60 bg-white rounded-lg p-4 font-bold text-blue-900 text-3xl shadow-[0_8px_0_0_rgba(0,0,0,0.2)] hover:shadow-[0_4px_0_0_rgba(0,0,0,0.2)] hover:translate-y-1 transition-all duration-200 ease-in-out transform active:translate-y-2 active:shadow-[0_2px_0_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-50 hover:bg-blue-900 hover:text-white"
                            type="button"
                            onClick={(event) => handleSignClick(event, "/dashboard")}
                            >
                            Check Out Our Pizzas   
                            {/* <span> &gt; </span> */}
                            </button>
                            
                    </div>
                    {/* <article className="relative w-full min-h-screen   bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYSxwaTqPTsKXjuhO5hvcC3d4mgEqx7sC5SA&s')]">
                                <h2 className=" text-3xl  font-bold">Our Services</h2>
                                <div className='absolute top-0 left-0 w-full h-full slanted-divider flex mt-10 items-center  '></div> 
                                    <div className=' absolute flex justify-center w-full h-full' >
                                    {Services.map((service, i) =>{
                                            // const angle =(i* 360)/Services.length  //evenly distribute divs in a circle
                                            return(
                                                <div key={i} className='absolute card animate-card' 
                                                style={{                                                    
                                                    // animation:`slideInOut ${Services.length * 3}s infinite`,
                                                    animationDelay: `${1 * 3}s`,    //stagger the cards                                            
                                                }}> <ServiceCard service={Services[i]}/> </div>
                                            )
                                        })}                                 
                                    </div>
                                                              
                    </article> */}

                </div>
                <Footer />
            </main>
        </>
    );
};

//Component for each card to keep code clean and reusable
// function ServiceCard({ service }){
//     return(
//         <div className='bg-red-800 w-64 rounded-lg h-[405px] '>
//             <h3 className="text-3xl text-white underline underline-offset-4 mb-5">{service.title} </h3>
//             <p>{service.p1} </p>
//             <div className="justify-center item-center"><img className=" rounded pl-20 mt-1 items-center h-36" src={service.url} alt={service.title}></img></div>            
//             <p className="mb-3">{service.p2}</p> 
//         </div>
//     )
// }

