import Header from "../components/header"
import Footer from "../components/footer"
import SignForm from "../components/signForm"
import Btn from "../components/btn"
import { useNavigate } from "react-router-dom"

export default function SignUpPage(){
    const navigate = useNavigate()
    const goBack =() =>{
        navigate(-1)        //Go back to the previous page
    }
    return(
        <div className="relative pt-28 bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYSxwaTqPTsKXjuhO5hvcC3d4mgEqx7sC5SA&s')]  ">
            <Header />
            <div><Btn name={"< Back"} onClick={goBack} /></div>            
            <SignForm formTitle="SIGN UP"   ask="Already"  showRepeatPassword= {true}  />    {/*Render the sign up form and show the Repeat Password field*/}
            <Footer />
        </div>
    )
};