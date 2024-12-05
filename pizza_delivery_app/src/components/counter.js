import React,{ useState } from "react";
import Btn from "./btn";

const Counter = () =>{
    const [count , setCount] =useState(2);

    const increment =() => setCount((prev) =>prev+1);
    const decrement = () => setCount((prev)=>(prev > 0 ? prev -1: 0));

    return(
        <div className="flex items-center space-x-4 ">
            {/* decrement button */}
            <Btn name="-" onClick={decrement}/>

            {/* counter value */}
            <span className="text-sm text-gray-500"> {count} " Item(s)"</span>

            {/* increment button */}
            <Btn name="+" onClick={increment} />
        </div>
    )
}

export default Counter;