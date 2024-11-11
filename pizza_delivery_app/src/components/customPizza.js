import React, {useState} from "react"
import Btn from "./btn";


export default function CustomPizza( { isOpen, onClose } ){
    const [step, setStep] = useState(1);
    const [customization,  setCustomization]  = useState({
        base: null,
        sauce : null,
        cheese : null,
        veggie : [],
        quantity: null
    })

    const bases = ['Thin Crust', 'Thick Crust', 'Cheese Burst', 'Gluten-Free', 'Stuffed Crust'];
    const sauces = ['Tomato', 'Pesto', 'White Garlic', 'BBQ', 'Alfredo'];
    const cheeses = ['Mozzarella', 'Cheddar', 'Parmesan', 'Goat Cheese', 'Vegan Cheese'];
    const veggies = ['Olives,', 'Mushrooms,', 'Bell Peppers,', 'Onions,', 'Jalapeños'];

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
                {step === 5 && <Btn name={"Add To Cart"} />}
        </div>
        )
    }

    function Options({array,  arrName,  title}){
        return(
            <div>
                <h3  className="text-lg font-semibold text-center  ">{title}</h3>
                <ul className="my-2 flex flex-row justify-between">
                    { array.map((item) =>(
                        <li  key={item}>
                            {/*For veggies selection , handle it as a multiselect*/}
                            {arrName === "veggies" ? (
                                <button onClick={() =>  setCustomization(prev => ({...prev,  veggie: prev.veggie.includes(item)  ? prev.veggie.filter(v => v !== item)  : [...prev.veggie, item]}))
                                    } className={`p-2 m-1 ${ customization.veggie.includes(item)  ? 'bg-green-500 rounded-lg font-bold text-black'  : 'bg-gray-200 rounded-lg'  }`} >  {item} </button>
                            ) : (
                                //For other options, single select 
                                <button  onClick={() => handleSelection(arrName.slice(0, -1), item)}  className={`p-2 m-1 ${  customization[arrName.slice(0, -1)] === item ? 'bg-green-500 rounded-lg font-bold text-black' : 'bg-gray-200 rounded-lg'  }`} >  {item}</button>
                            )}
                        </li>
                    )) }
                </ul>
              
                {navigation()}
            </div>
        )
    }

    return(
        <>
            <div className="fixed  bg-gray-800 bg-opacity-75 flex justify-center items-center inset-0  z-50">
                <div className="relative bg-white p-6 rounded-lg w-1/2 h-96">                    
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
                            <h3 className="text-lg font-semibold text-center mt-10 ">MY COMBINATION</h3>
                            <div className="flex flex-row justify-between">
                                <div>
                                    <p>Base:<span className="font-bold text-green-500 ml-6"> {customization.base}</span> </p>
                                    <p>Sauce: <span className="font-bold text-green-500 ml-6"> {customization.sauce} </span></p>
                                    <p>Cheese: <span  className="font-bold text-green-500 ml-6">{customization.cheese} </span></p>
                                    <p>Veggie: <span className="font-bold text-green-500 ml-6"> {customization.veggie} </span></p>

                                    <label> Quantity: <input className="ml-2 border-2 border-slate-950 bg-gray-100 rounded-lg  text-center" type="number" value={customization.quantity } min="1" onChange={(e) => handleSelection("quantity", e.target.value) }  required></input> </label>
                                </div>
                                <div>
                                    <p>Small(15 cm ): </p>
                                    <p> Medium (30 cm): </p>
                                    <p>Large (45 cm) :</p>
                                    <p> Extra Large (50 cm): </p>
                                </div>
                            </div>

                            {navigation()}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}