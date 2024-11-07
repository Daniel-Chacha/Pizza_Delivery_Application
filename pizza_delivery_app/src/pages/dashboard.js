import Header from "../components/header";
import Footer from "../components/footer";

export default function Dashboard(){
    return(
        <>
            <div  className="h-screen bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYSxwaTqPTsKXjuhO5hvcC3d4mgEqx7sC5SA&s')] ">
                <Header showMiniHeader={true} />
                <div className="flex flex-row mt-32 ">
                    <div className="w-3/4">
                        <div className="flex ">
                            <h2 className="">Category</h2>
                            <div className="m-5 bg-white p-0 w-fit  ">
                                <img className="w-56  h-48" src="placeholder.com" alt="pizza1"></img>
                                <p>Pizza Name</p>
                                <p>Prize</p>
                            </div>
                            <div className="m-5 bg-white p-0  w-fit">
                                <img className="w-56  h-48" src="placeholder.com" alt="pizza1"></img>
                                <p>Pizza Name</p>
                                <p>Prize</p>
                            </div>
                        </div>

                    </div>
                    <div>
                        <h3>Cart</h3>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}