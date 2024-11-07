

export default function Btn(name){
    return(
        <>
             <button className="bg-red-800 text-white p-2 font-bold rounded-md  hover:bg-red-600" type="submit">{name.name}</button>
        </>
    )
}