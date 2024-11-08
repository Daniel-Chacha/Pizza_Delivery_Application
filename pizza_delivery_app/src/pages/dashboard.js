import Header from "../components/header";
import Footer from "../components/footer";
import PizzaCard  from "../components/pizzaCard";
import { PizzaData } from "../components/data";

export default function Dashboard(){
    return(
        <>
            <div  className="pt-32 bg-fixed  bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYSxwaTqPTsKXjuhO5hvcC3d4mgEqx7sC5SA&s')] ">
                <Header showMiniHeader={true} />
                {/* <div className="flex flex-row "> */}
                    <div className="flex flex-row  flex-wrap justify-center">
                        { PizzaData.map((pizza)  =>(
                            <PizzaCard key={pizza.id}  pizza={pizza}/>
                        )) }
                    </div>
                    {/* <div>
                        <h3>Cart</h3>
                    </div> */}
                {/* </div> */}
                <Footer />
            </div>
        </>
    )
}