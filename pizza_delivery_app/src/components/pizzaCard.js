
import React, {useEffect, useState,useContext }from "react"
import Btn from "./btn"
import Counter from "./counter";
import { UserContext } from "../userContext";
import { SaveToCart } from "../Requests/requests";
import { FetchCartData } from "../Requests/requests";

export default function PizzaCard({ pizza , onAddToCart ,reFetchCartData} ){
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedSizes, setSelectedSizes] =useState([]);
    const [quantities, setQuantities]  = useState( Array(selectedSizes.length).fill(1)); //State to manage quantities for each size .Initialize with zeros   
    const [prices, setPrices] =useState([])
    const {userDetails} =useContext(UserContext);

    // Sync quantities with selected sizes
    useEffect(() => {
        setQuantities((prev) => {
            return selectedSizes.map((_, index) => prev[index] ?? 1); // Preserve previous quantities
        });
    }, [selectedSizes]);

    // Define the updateQuantity function here
    const updateQuantity = (index, newCount) => {
        if(typeof newCount !== "number"){
            console.error("Invalid value for newCount: ", newCount);
            return;
        }
        setQuantities((prev) =>
            prev.map((qty, i) => (i === index ? newCount : qty))        
        );
        // console.log("Quantities:", quantities);
    }; 

    //useEffect to calculate prices whenever 'selectedSizes' or 'quantities ' change
    useEffect(() =>{
        const calculatedPrices = selectedSizes.map((size, index) => size.price * quantities[index]);
        setPrices(calculatedPrices);
    }, [selectedSizes, quantities]);  // dependencies

    //open modal if atleast one of the sizes  selected
    const openModal = () =>{
        if (selectedSizes.length  > 0){
            setIsModalOpen(true);
        }else {
            alert("Please select at least one size")
        }
    };

    //close modal
    const closeModal = () =>{
        setIsModalOpen(false);
    }

    //handles size selection
    const  handleSizeChange = (size) =>{
        if (selectedSizes.includes(size)){
            setSelectedSizes(selectedSizes.filter((s) =>  s !== size ));
        } else{
            setSelectedSizes([...selectedSizes, size]);
        }
    }

    //Calculate total price based on selected sizes and quantity
    const calculateTotalPrice = () =>{
        return  selectedSizes.reduce((total,  size, index) => total + size.price  *  quantities[index], 0);
    }

    const handleAddToCart = async() =>{
        const orderItems ={
            category :pizza.category,
            sizes:  selectedSizes,
            quantities:  quantities,
            // flavor: flavor,
            prices: prices,
            totalPrice:  calculateTotalPrice(),
            userId: userDetails.userId,
        };
        console.log("THE ORDER: ", orderItems)
        //call the onAddToCart  function to add this item to the orders list in Dashboard
        try{
            const response =await SaveToCart(orderItems);
            console.log("Saving to Cart Response: ", response);
        }catch(err){
            console.error("Could not save to cart: ", err);
        }
        // onAddToCart((prevOrders) =>[...prevOrders  ,orderItems]);
        setSelectedSizes([]);
        // setFlavor("");
        reFetchCartData()
        closeModal()
    };


    return(
        <>
            <div className=" items-center p-5 m-5 rounded-lg shadown-md bg-white w-72">
                <h2 className="text-lg font-bold mb-2 text-center  bg-green-800 text-white rounded-lg">  {pizza.category} </h2>
                <img className="w-56  h-48 object-cover mb-3 " src={pizza.url} alt={pizza.category}></img>
                <p className="mb-2 text-gray-700 italic"  > {pizza.description} </p>

                <div className="flex flex-col space-y-2  w-full">
                    {/* <img className="w-56  h-48" src="placeholder.com" alt="pizza1"></img> */}
                    { Object.values(pizza.sizes).map((size) =>(
                        <div key={size.id} className="flex justify-between   bg-slate-100 rounded  shadown-md">
                            <input type="checkbox"  className="form-checkbox h-4 w-4 text-blue-600" value={size.id}  onChange={() => handleSizeChange(size)}  checked={selectedSizes.includes(size)}></input>
                            <span > {size.level  ?   `${size.level} (${size.diameter }  cm)`  :   "Size Not Specified"} </span>
                            <span  className="text-green-600 font-semibold">Ksh { size.price } </span>
                        </div>
                    )) }
                </div>
                <div className="flex justify-center">
                <Btn name="Add To Cart" onClick={openModal} />
                </div>
                
                            {/* Modal Popup */}
                {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                        <h2 className="text-xl font-bold mb-4 text-center text-green-600 underline underline-offset-2">YOUR PIZZA</h2>

                        {/* Selected Sizes Display */}
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">Selected Sizes:</h3>
                            <ul>
                                {selectedSizes.map((size,index) => (
                                    <li key={size.id} className="flex justify-between">
                                        <span>
                                            {size.level ? `${size.level} (${size.diameter || size.radius} cm)` : "Size Not Specified"}
                                        </span>
                                        <div className="mt-2">
                                        <Counter count={quantities[index]} setCount={(newCount) => updateQuantity(index, newCount)} />
                                        </div>
                                        
                                        <span>Ksh {prices[index]}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Total Price Display */}
                        <div className="text-lg font-semibold mb-4">
                            Total Price: <span className="text-green-600">Ksh {calculateTotalPrice()}</span>
                        </div>

                        {/* Modal Buttons */}
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <Btn name="Add To Cart"  onClick={handleAddToCart}  />
                        </div>
                    </div>
                </div>
            )}
            </div>
        </>
    )
}