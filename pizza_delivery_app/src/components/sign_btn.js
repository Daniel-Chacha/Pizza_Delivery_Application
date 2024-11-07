


export function SignBtn( {onClick,  btnName} ){
    return(
        <>
            <button  className=" bg-white  h-10 rounded-lg p-2 font-bold  text-blue-900 hover:bg-black hover:text-white     " type="button" onClick={onClick}> {btnName  } </button>
        </>
    );
}

