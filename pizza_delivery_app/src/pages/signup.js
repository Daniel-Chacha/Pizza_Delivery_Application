import Header from "../components/header"
import Footer from "../components/footer"
import SignForm from "../components/signForm"

export default function SignUpPage(){
    return(
        <div className="pt-28 bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYSxwaTqPTsKXjuhO5hvcC3d4mgEqx7sC5SA&s')]  ">
            <Header />
            <SignForm formTitle="SIGN UP"   ask="Already"  showRepeatPassword= {true}  />    {/*Render the sign up form and show the Repeat Password field*/}
            <Footer />
        </div>
    )
};