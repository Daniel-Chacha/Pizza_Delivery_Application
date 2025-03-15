    import React, {useState, useEffect, useCallback, useContext} from "react"
    import Btn from "./btn";
    import { bases, cheeses, sauces, veggies } from "./data";
    import { SizeRow } from "./sizeRow";
    import { UserContext } from "../userContext";
    import { SaveToCart } from "../Requests/requests";
    import { ErrorPopUp } from "./errorPoPup";


    export default function CustomPizza( { isOpen, onClose , reFetchCartData} ){
        const [step, setStep] = useState(1);
        const [customization,  setCustomization]  = useState({
            base: null,
            sauce : null,
            cheese : null,
            veggie : [],
        })
        const [selectedSizes, setSelectedSizes] = useState([]);
        const [quantities, setQuantities] = useState({}) //State to manage quantities for each size .Initialize with zeros 
        const [prices, setPrices] =useState([]);
        const [totalPrice, setTotalPrice] =useState(0);
        const {userDetails} =useContext(UserContext);
        const [isErrorPopUpOpen, setIsErrorPopUpOpen] = useState(false);
        // console.log(totalPrice);

        //sync quantities with selected sizes
        useEffect(() => {
            setQuantities((prevQuantities) => {
                // Initialize quantities for new sizes, keep existing quantities
                const updatedQuantities = { ...prevQuantities };
                selectedSizes.forEach((size) => {
                    if (!(size in updatedQuantities)) {
                        updatedQuantities[size] = 1; // Default to 1 if not already set
                    }
                });
                return updatedQuantities;
            });
        }, [selectedSizes]);

        

        //Defined the updateQuantity function here
        const updateQuantity = (size, newCount) => {
            if (typeof newCount !== "number" || newCount < 1) {
                console.error("Invalid value for newCount:", newCount);
                return;
            }
            setQuantities((prevQuantities) => ({
                ...prevQuantities,
                [size]: newCount,
            }));

            console.log("SELECTED SIZES: ", selectedSizes)
            console.log("QUANTITIES: ", quantities)
        }
        

        const handleSizeChange = (size) => {
            setSelectedSizes((prevSizes) => {
                if (prevSizes.includes(size)) {
                    // Remove size and its quantity
                    setQuantities((prevQuantities) => {
                        const updatedQuantities = { ...prevQuantities };
                        delete updatedQuantities[size];
                        return updatedQuantities;
                    });
                    return prevSizes.filter((s) => s !== size);
                } else {
                    // Add size with a default count of 1
                    setQuantities((prevQuantities) => ({
                        ...prevQuantities,
                        [size]: 1,
                    }));
                    return [...prevSizes, size];
                }
            });
            // getTotalPrice()
            console.log("SELECTED SIZES: ", selectedSizes)
            console.log("QUANTITIES: ", quantities)
        };
        
        
        //function to handle selection changes
        const handleSelection = (type, value) =>{
            setCustomization((prev)  =>({
                ...prev, [type]: value
            }));
        }

        //Function to handle next and previous steps
        const nextStep = () => setStep(step + 1);
        const prevStep = () => setStep( step - 1);

        function navigation(){
            return(
                <div  className="flex  justify-between mt-4">
                    {step > 1  && <Btn name={"Back"}  onClick={prevStep}/>}
                    {step  <5 && <Btn name={"Next"}  onClick={nextStep}/>}
                    {step === 5 && <Btn name={"Add To Cart"} onClick={checkSignInAddToCart} />}
            </div>
            )
        }

        function Options({array,  arrName,  title}){
            return(
                <div>
                    <h3  className="text-lg font-semibold text-center  ">{title}</h3>
                    <ul className="my-2 flex flex-row justify-between">
                        { array.map((item) =>(
                            <li  key={item.id}>
                                {/*For veggies selection , handle it as a multiselect*/}
                                {arrName === "veggies" ? (
                                    <div>
                                        <button onClick={() =>  setCustomization(prev => ({...prev,  veggie: prev.veggie.some((v) => v.id === item.id)  ? prev.veggie.filter((v)=> v.id !== item.id)  : [...prev.veggie, item]}))
                                        } className={`p-2 m-1 ${ customization.veggie.some((v) => v.id ===item.id)  ? 'bg-green-500 rounded-lg font-bold text-black'  : 'bg-gray-200 rounded-lg'  }`} >  {item.name} </button>
                                        <img className="w-44  h-36 object-cover mb-3 mr-5" src={item.url} alt={item.name}></img>
                                    </div>

                                ) : (
                                    //For other options, single select 
                                    <div>
                                        <button  onClick={() => handleSelection(arrName.slice(0, -1), item)}  className={`p-2 m-1 ${  customization[arrName.slice(0, -1)]?.id === item.id ? 'bg-green-500 rounded-lg font-bold text-black' : 'bg-gray-200 rounded-lg'  }`} >  {item.name}</button>
                                        <img className="w-44  h-36 object-cover mb-3 mr-3" src={item.url} alt={item.name}></img>
                                    </div>

                                )}
                            </li>
                        )) }
                    </ul>
                
                    {navigation()}
                </div>
            )
        }

        const getIngredientsTotal  =useCallback(() =>{
            const getPrice =(ingredient, size) =>ingredient?.price[size] || 0;
            
            return{
                small:
                    getPrice(customization.base, "small") + getPrice(customization.sauce, 'small') + getPrice(customization.cheese, 'small') +
                    customization.veggie.reduce((sum, veggie) =>sum + getPrice(veggie, 'small'), 0),
                medium:
                    getPrice(customization.base, 'medium') + getPrice(customization.sauce, 'medium') + getPrice(customization.cheese, 'small') +
                    customization.veggie.reduce((sum, veggie) =>sum + getPrice(veggie, 'medium'), 0 ),
                large:
                    getPrice(customization.base, 'large') + getPrice(customization.sauce, 'large') + getPrice(customization.cheese, 'large') + 
                    customization.veggie.reduce((sum, veggie) => sum + getPrice(veggie, 'large'), 0),
                extra_large:
                    getPrice(customization.base, 'extra_large') + getPrice(customization.sauce, 'extra_large') + getPrice(customization.cheese, 'extra_large') +
                    customization.veggie.reduce((sum, veggie) => sum + getPrice(veggie, 'extra_large'), 0),
            }
        }, [customization])

        useEffect(() =>{
            // const total =selectedSizes.reduce((sum, size) => sum + getIngredientsTotal()[size] * quantities[size], 0);
            setPrices(selectedSizes.map((size) =>(getIngredientsTotal()[size]) * quantities[size]))
            
            setTotalPrice(prices.reduce((sum, curr) => sum+curr, 0))
            // console.log("Total Price: ", total) 
        }, [selectedSizes, quantities, getIngredientsTotal])

        // console.log("SELECTED SIZES: ", selectedSizes)
        // console.log("QUANTITIES: ", quantities)

        const  formatted_sizes = selectedSizes.map((sizes) =>(
            {
                level: sizes,
                diameter: sizes === 'small' ? 15 : sizes === 'medium' ? 30 : sizes === 'large' ? 45 : 50 ,
              
            }
        ))

          //check if user is signed In, if not, they have to sign in before adding items to cart
        const checkSignInAddToCart = () =>{
            if (!userDetails?.userId){
                setIsErrorPopUpOpen(true);
            }else{
                pushToCart();
            }
        }

        const pushToCart =async() =>{
            const orderItems ={
                category: "Customized Pizza",
                sizes: formatted_sizes,
                quantities: Object.values(quantities),
                prices: prices,
                totalPrice: totalPrice,
                userId: userDetails.userId
            }
            console.log('CART ITEMS: ',orderItems);
        try{
            const response =await SaveToCart(orderItems);
            console.log("Saving to Cart Response: ", response);
            reFetchCartData()
            onClose()
        }catch(err){
            console.error("Could not save to cart: ", err);
            alert("An error occurred")
        }
        
        }
        return(
            <>
                <div className="fixed  bg-gray-800 bg-opacity-75 flex justify-center items-center inset-0  z-50">
                    <div className="relative bg-white p-6 rounded-lg  h-auto w-auto">                    
                        <span className="absolute top-0 right-2   cursor-pointer  " onClick={onClose}><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">	<path fill="black" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m4.3 14.3a.996.996 0 0 1-1.41 0L12 13.41L9.11 16.3a.996.996 0 1 1-1.41-1.41L10.59 12L7.7 9.11A.996.996 0 1 1 9.11 7.7L12 10.59l2.89-2.89a.996.996 0 1 1 1.41 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41" /></svg>  </span>
                        <h2 className="text-xl font-bold text-center bg-red-800 text-white"> MAKE YOUR OWN PIZZA</h2>

                        { step === 1 && (
                            <Options array={bases} arrName={"bases"} title={"Choose a Pizza Base"}/>
                        ) }

                        {step === 2 && (
                            <Options array={sauces}  arrName={"sauces"} title={"Choose a Sauce"}/>
                        )}

                        {step ===3 &&(
                            <Options array={cheeses}  arrName={"cheeses"} title={"Choose a Cheese Type"}/>
                        )}

                        {step === 4 && (    
                            <Options array={veggies}  arrName={"veggies"} title={"Select  Veggies"}/>
                        )}
                        
                        {step === 5 &&(
                            <div>
                                <h3 className="text-lg font-semibold text-center mt-4 underline ">MY COMBINATION</h3>
                                <div className=" justify-between">
                                    <div className="mb-6">                                 
                                                                            
                                        <p>Veggie:{" "} <span className="font-bold text-green-500 ml-6"> {customization.veggie.length > 0 ? customization.veggie.map((v) =>v.name).join(", "):"Not selected"} </span></p>
                                        <p>Cheese:{" "} <span  className="font-bold text-green-500 ml-6">{customization.cheese ? customization.cheese.name : "Not selected"} </span></p>
                                        <p>Sauce:{" "} <span className="font-bold text-green-500 ml-6"> {customization.sauce ? customization.sauce.name :"Not selected"} </span></p>
                                        <p>Base:{" "}<span className="font-bold text-green-500 ml-6"> {customization.base ? customization.base.name : "Not selected"}</span> </p>
                                        

                                        {/* <label> Quantity:{" "} <input className="ml-2 border-2 border-slate-950 bg-gray-100 rounded-lg  text-center" type="number" value={customization.quantity } min="1" onChange={(e) => handleSelection("quantity", e.target.value) }  required></input> </label> */}
                                    </div>
                                    <div>
                                        {(() => {
                                            return(
                                                <>
                                                     <SizeRow size={'small'} label={'Small (15cm)'} price={getIngredientsTotal()['small'] * (quantities['small'] || 1)} checked={selectedSizes.includes("small")} onSizeChange={() => handleSizeChange('small')} quantity={quantities['small'] || 1} onQuantityChange={(newCount) => updateQuantity('small', newCount)} />
                                                     <SizeRow size={'medium'} label={'Medium (30cm)'} price={getIngredientsTotal()['medium'] * (quantities['medium'] || 1)} checked={selectedSizes.includes("medium")} onSizeChange={() => handleSizeChange('medium')} quantity={quantities['medium'] || 1} onQuantityChange={(newCount) => updateQuantity('medium', newCount)} />
                                                     <SizeRow size={'large'} label={'Large (45cm)'} price={getIngredientsTotal()['large'] * (quantities['large'] || 1)} checked={selectedSizes.includes("large")} onSizeChange={() => handleSizeChange('large')} quantity={quantities['large'] || 1} onQuantityChange={(newCount) => updateQuantity('large', newCount)} />
                                                     <SizeRow size={'extra_large'} label={'Extra Large(50cm)'} price={getIngredientsTotal()['extra_large'] * (quantities['extra_large'] || 1)} checked={selectedSizes.includes("extra_large")} onSizeChange={() => handleSizeChange('extra_large')} quantity={quantities['extra_large'] || 1} onQuantityChange={(newCount) => updateQuantity('extra_large', newCount)} />
                                                </>
                                            )
                                        })()}

                                        <p className="text-center text-red-600 font-extrabold mt-4">TOTAL: Ksh{totalPrice}</p>
                                    </div>
                                </div>

                                {navigation()}
                            </div>
                        )}
                    </div>
                    <ErrorPopUp isOpen={isErrorPopUpOpen} onClose={() => setIsErrorPopUpOpen(false)} />
                </div>
            </>
        )
    }