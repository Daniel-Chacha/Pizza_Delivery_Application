import React from "react";
import Btn from "./btn";

const Counter = ({count, setCount}) =>{
    // const [count , setCount] =useState(2);

    const increment =() => setCount(count+1);
    const decrement = () => setCount(count > 1 ? count -1: 1);

    return(
        <div className="flex items-center space-x-4 ">
            {/* decrement button */}
            <Btn name="-" onClick={decrement} aria-label="Decrease item count"  />

            {/* counter value */}
            <span className="text-sm text-blue-500 font-semibold"> {count} " Item(s)"</span>

            {/* increment button */}
            <Btn name="+" onClick={increment} aria-label="Decrease item count"  />
        </div>
    )
}

export default Counter;