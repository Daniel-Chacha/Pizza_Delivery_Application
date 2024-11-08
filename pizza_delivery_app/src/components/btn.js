

export default function Btn({name , onClick}  ){
    return(
        <>
             <button className="bg-red-800 text-white p-2 font-bold rounded-md  hover:bg-red-600"  onClick={onClick}>{name}</button>
        </>
    )
}