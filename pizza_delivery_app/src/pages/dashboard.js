import  React,{ useState }  from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import PizzaCard  from "../components/pizzaCard";
import { PizzaData } from "../components/data";
import Cart from "../components/cart";
import CustomPizza from "../components/customPizza";

export default function Dashboard(){
    // state to control custom  pizza  visibility
    const [showCustomPizza, setShowCustomPizza]  =useState(false);

    //state to control the cart visibility
    const [cartVisible,  setCartVisible] = useState(false)

    //state to hold selected orders
    const [orders, setOrders] = useState([])

    //function to toggle  cart visibility
    const toggleCart = () =>{
        setCartVisible(!cartVisible)
    };

    const toggleCustomPizza = () =>{
        setShowCustomPizza(!showCustomPizza)
    };
    return(
        <>
            <div  className="pt-32 bg-fixed  bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYSxwaTqPTsKXjuhO5hvcC3d4mgEqx7sC5SA&s')] ">
                <Header showMiniHeader={true} onCartClick ={toggleCart}  toggleCustomPizza={toggleCustomPizza}/>
                {/* <div className="flex flex-row "> */}
                    <div className="flex flex-row  flex-wrap justify-center">
                        { PizzaData.map((pizza)  =>(
                            <PizzaCard key={pizza.id}  pizza={pizza}  onAddToCart={setOrders} />
                        )) }
                    </div>
                    {/*Conditionally render the Cart Component*/}
                    {cartVisible  &&
                        <div className="fixed right-0 top-32 z-20  h-96  overflow-auto  ">
                            <Cart orders={orders}  toggleCart={toggleCart}/>
                        </div>
                    }

                    {/*Conditionaluu render CustomPizza modal */}
                    {showCustomPizza && (
                        <CustomPizza onClose={toggleCustomPizza} />
                    )}
                <Footer />
            </div>
        </>
    )
}