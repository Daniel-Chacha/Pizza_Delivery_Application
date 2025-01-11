import Counter from "./counter"

export  const SizeRow = ({size, label, price, checked, onSizeChange, quantity, onQuantityChange}) =>{
    return(
        <p className="flex justify-between mt-3">
            <span>
                <input type="checkbox" onChange={onSizeChange} checked={checked} className="form-checkbox h-4 w-4 text-blue-600 "></input>
            </span>
            {label}:
            <span className="text-green-600 font-semibold"> Ksh{price}</span>
            <Counter count={quantity} setCount={onQuantityChange} />
        </p>
    )
}