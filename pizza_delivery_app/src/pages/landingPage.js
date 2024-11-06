import  React , {useState, useEffect} from 'react';
import Header from "../components/header";
import Footer from "../components/footer";
import {SignupBtn} from  "../components/signUp_btn"
import { SigninBtn } from "../components/signIn_btn";
import { Services } from "../components/data";
import { useNavigate } from 'react-router-dom';

export default function LandingPage(){
    //state to keep track of the current  service index
    const [index1, setIndex1] =useState(0);
    const [index2, setIndex2] =useState(1);
    const [index3, setIndex3] =useState(2);
    const navigate = useNavigate();

    //redirect function for  Sign Up  botton click
    const handleSignUpClick =() =>{
        navigate('/signup')
    }

    //effect to change the service after  every 5 seconds
    useEffect(() =>{
        const interval =setInterval(() =>{
            setIndex1((prevIndex) => (prevIndex +1) % Services.length);
            setIndex2((prevIndex) =>(prevIndex + 1)%Services.length);
            setIndex3((prevIndex) =>(prevIndex +1)% Services.length);
        }, 4000);     //change content every 5 seconds 

        //cleanup interval on component unmount
        return() => clearInterval(interval);
    }, []);

 
    return(
        <>
            <main className='App'>
                <Header />
                <div >
                    <div className="h-screen bg-fixed   bg-no-repeat bg-cover bg-center bg-[url('https://img.freepik.com/premium-photo/colorful-homemade-pizza-with-black-ham-cherry-tomatoes_1126714-13131.jpg?ga=GA1.1.329323705.1719251145')]" >
                            <h2 className=' text-3xl  text-white pt-28 font-bold'>Your Ultimate Pizza Destination</h2>
                            <div className=' flex gap-5  justify-center'>
                                <SignupBtn onClick={handleSignUpClick} />
                                <SigninBtn />
                            </div>
                    </div>
                    <article className="  h-screen bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYSxwaTqPTsKXjuhO5hvcC3d4mgEqx7sC5SA&s')] w-full ">
                                <h2 className=" text-3xl  font-bold">Our Services</h2>
                                <div className='flex flex-wrap pt-10'>
                                    <ServiceCard service={Services[index1]}/>
                                    <ServiceCard service={Services[index2]}/>
                                    <ServiceCard service={Services[index3]}/>
                                </div>
                                
                    </article>

                </div>
                <Footer />
            </main>
        </>
    );
};

//Component for each card to keep code clean and reusable
function ServiceCard({ service }){
    return(
        <div className='bg-red-800 w-96 ml-10 rounded-lg h-130'>
            <h3 className="text-3xl text-white underline underline-offset-4 mb-5">{service.title} </h3>
            <p>{service.p1} </p>
            <img className=" rounded pl-20 mt-10" src={service.url} alt={service.title}></img>
            <p className="mb-3">{service.p2}</p> 
        </div>
    )
}

