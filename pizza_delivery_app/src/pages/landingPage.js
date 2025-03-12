import React from 'react';
import Header from "../components/header";
import Footer from "../components/footer";
import { Carousel } from '../components/carousel';
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();
    
    //redirect function for  Sign Up  botton click
    const handleSignClick =(event  , location) =>{
        event.preventDefault();
        navigate(location)
    }
    const slideItems = [
        {
            id: 1,
            imageSrc: "/images/img1.avif",
            welcome: "WELCOME TO:",
            topic: "YOUR ULTIMATE PIZZA DESTINATION",
            des: "We don't just sell you any pizza, we sell you the best pizza in town. The quality of our pizzas speaks for itself.",
        },
        {
            id: 2,
            imageSrc: "/images/img3.jpg",
            welcome: "WELCOME TO:",
            topic: "YOUR ULTIMATE PIZZA DESTINATION",
            des: "We don't just sell you any pizza, we sell you the best pizza in town. The quality of our pizzas speaks for itself.",
        },
        {
            id: 3,
            imageSrc: "/images/img4.avif",
            welcome: "WELCOME TO:",
            topic: "YOUR ULTIMATE PIZZA DESTINATION",
            des: "We don't just sell you any pizza, we sell you the best pizza in town. The quality of our pizzas speaks for itself.",
        },
        {
            id: 4,
            imageSrc: "/images/img5.avif",
            welcome: "WELCOME TO:",
            topic: "YOUR ULTIMATE PIZZA DESTINATION",
            des: "We don't just sell you any pizza, we sell you the best pizza in town. The quality of our pizzas speaks for itself.",
        },
    ];

    return (
        <>
            <main className="App">
                <Header background_color='bg-transparent'underline={true}/>
                <Carousel slideItems={slideItems} handleSignClick={handleSignClick}/>
                {/* <Footer /> */}
            </main>
        </>
    );
}