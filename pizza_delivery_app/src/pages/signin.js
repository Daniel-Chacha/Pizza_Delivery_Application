import Header from "../components/header"
import Footer from "../components/footer"
import SignForm from "../components/signForm"
import { useNavigate } from "react-router-dom"
import Btn from "../components/btn"

export default function SignInPage(){
    const navigate = useNavigate()

    const goBack=() =>{
        navigate(-1)
    }
    return(
        <div className="pt-28 bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYSxwaTqPTsKXjuhO5hvcC3d4mgEqx7sC5SA&s')]  ">
            <Header />
            <Btn name={"< Back"} onClick={goBack}/>
            <SignForm formTitle="SIGN IN"  ask="Don't"  showRepeatPassword= {false} />    {/*Render the sign up form and hide the Repeat Password field*/}
            <Footer />
        </div>
    )
};