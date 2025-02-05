import  React, { useEffect }  from 'react';
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
    //     return() => clearInterval(interval);                ,'/images/img6.jpg','/images/img7.avif','images/img8.jpg', '/images/img9.avif', '/images/img10.jpg', '/images/img11.avif', '/images/img12.webp'
    // }, []);
    const pictures= ['/images/img1.avif','/images/img3.jpg', '/images/img4.avif', '/images/img5.avif']
    
   

    return(
        <>
            <main className='App  flex-col'>
                <Header />
                <div className=' overflow-hidden relative h-[100vh] w-[100vw]  carousel' > 

                    {/* list      */}
                    <div className='list'>
                        {pictures.map((pik, index) =>(
                            <div key={index} className="w-full h-full absolute inset-0  item" >
                                <img className='w-full h-full object-cover ' src={pik} alt='pizza'></img>

                                <div  className='content absolute top-[30%] max-w-[80%] w-[1140px] text-left left-10 text-[#fff] drop-shadow-[0_5px_10px_#0004]' >
                                    <p  className='welcome font-bold tracking-[10px] text-[16px] '>WELCOME TO:</p>
                                    <p  className='topic  text-[3em] leading-[1.65rem] text-white pt-10 font-bold '>YOUR ULTIMATE PIZZA DESTINATION</p>
                                    <p  className='des text-[1em] mt-10 font-bold'>We don't just sell you any pizza, we sell you the best pizza in town. The quality of our pizzas speak for itself.</p>
                                    
                                    <button
                                    
                                    className="buttons mt-20 poppins-medium  border-none tracking-[3px]  bg-[#eee] p-2 font-bold text-blue-900 text-3xl shadow-[0_8px_0_0_rgba(0,0,0,0.2)] hover:shadow-[0_4px_0_0_rgba(0,0,0,0.2)] hover:translate-y-1 transition-all duration-200 ease-in-out transform active:translate-y-2 active:shadow-[0_2px_0_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-50 hover:bg-blue-900 hover:text-white"
                                    type="button"
                                    onClick={(event) => handleSignClick(event, "/dashboard")}
                                    >
                                    SEE PIZZAS   
                                    {/* <span> &gt; </span> */}
                                    </button>
                                </div>
                            
                            </div>
                        ))}

                    </div>

                    {/* thumbnails */}
                    <div  className='thumbnail absolute bottom-[50px] left-1/2 flex gap-5 z-[100] w-max'>
                        {pictures.map((pik, index) =>(
                            <div key={index}  className='item w-[150px] h-[220px] flex-shrink-0 relative'>
                                <img className='w-full h-full object-cover rounded-[20px]' src={pik} alt='pizza thumbnail'></img>
                                <div  className='content text-[#fff] absolute bottom-[10px] left-[10px] right-[10px]'>
                                    <p  className='title font-medium'>Name Slider</p>
                                    <p  className='description font-light'>Description</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* next prev */}
                    <div className='arrows absolute top-[80%] right-[52%] z-100 w-[300px] max-w-[30%] flex gap-[10px] items-center'>
                        <button id='prev' className='w-[40px] h-[40px] rounded-[50%] bg-[#eee4] border-none text-[#fff] font-bold transition-[.5s] hover:text-[#000] hover:bg-slate-100'> &lt; </button>
                        <button id='next' className='w-[40px] h-[40px] rounded-[50%] bg-[#eee4] border-none text-[#fff] font-bold transition-[.5s] hover:text-[#000] hover:bg-slate-100'> &gt; </button>
                    </div>

                    {/* time running */}
                    <div  className='time absolute z-1000 w-[0%] h-[3px] bg-[#f1683a] left-0 top-0'></div>

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
                {/* <Footer /> */}
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

