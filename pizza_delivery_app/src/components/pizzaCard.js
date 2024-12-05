
import React, {useEffect, useState }from "react"
import Btn from "./btn"
import Counter from "./counter";

export default function PizzaCard({ pizza , onAddToCart } ){
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedSizes, setSelectedSizes] =useState([]);
    const [quantity, setQuantity]  = useState([1]);
    // const [flavor, setFlavor]  = useState("");
 

    //open modal if atleast one of the sizes s selected
    const openModal = () =>{
        if (selectedSizes.length  > 0){
            setIsModalOpen(true);
        }else {
            alert("Please select atleast one size")
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
        return  selectedSizes.reduce((total,  size) => total +size.price  *  quantity, 0);
    }

    const handleAddToCart = () =>{
        const orderItems ={
            category :pizza.category,
            sizes:  selectedSizes,
            quantity:  quantity,
            // flavor: flavor,
            totalPrice:  calculateTotalPrice()
        };

        //call the onAddToCart  function to add this item to the orders lis t in Dashboard
        onAddToCart((prevOrders) =>[...prevOrders  ,orderItems]);
        setSelectedSizes([]);
        // setFlavor("");
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
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4 text-center text-green-600 underline underline-offset-2">YOUR PIZZA</h2>

                        {/* Quantity Selector */}
                        <label className="block mb-2">
                            Quantity:
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                className="ml-2 border rounded w-16 text-center"
                                min="1"
                            />
                        </label>

                        {/* Flavor Selector */}
                        {/* <label className="block mb-4">
                            Flavor:
                            <select
                                value={flavor}
                                onChange={(e) => setFlavor(e.target.value)}
                                className="ml-2 border rounded w-full"
                                placeholder="Enter flavor"
                                required>
                                    <option value="">Select Flavor</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Salty">Salty</option>
                                    <option value="Pepper">Pepper</option>
                            </select>
                        </label> */}

                        {/* Selected Sizes Display */}
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">Selected Sizes:</h3>
                            <ul>
                                {selectedSizes.map((size) => (
                                    <li key={size.id} className="flex justify-between">
                                        <span>
                                            {size.level ? `${size.level} (${size.diameter || size.radius} cm)` : "Size Not Specified"}
                                        </span>
                                        <Counter />
                                        <span>Ksh {size.prize}</span>
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