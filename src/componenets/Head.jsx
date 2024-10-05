import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { CartContext, Coordinates, Visibility } from "../context/contextApi";
import { useSelector, useDispatch} from "react-redux";
import { loginTooggle, toogleSearchBar } from "../utils/toogleSlice";
import SigninBtn from "./SigninBtn";

function Head(){

    const navItems = [
        {
        name : "Swiggy corporate",
        image :"-briefcase",
        path : "/corporate"
    },
    {
        name : "Search",
        image : "-magnifying-glass ",
        path : "/search"
    },
    {
        name : "Offers",
        image : "-percent ",
        path : "/offers"
    },
    {
        name : "Help",
        image : "-info",
        path : "/help"
    },
    {
        name : "Sidn In",
        image : "-user",
        path : "/signin"
    },
    {
        name : "Cart",
        image : "-cart-shopping",
        path : "/cart"
    }
    ]

    const [searchResult,setSearchResult] = useState([])
    const[address,setAddress] = useState("")
    const dispatch = useDispatch()
    
    const cartData = useSelector((state) => state.cartSlice.cartItems)
    const userData = useSelector((state) => state.authSlice.userData)
    

    const visible = useSelector((state) => state.toogleSlice.searchBarToogle)
    const loginVisible = useSelector((state) => state.toogleSlice.loginTooggle)

    const{setCoord} = useContext(Coordinates)
 
    function handleVisiblity(){
        dispatch(toogleSearchBar())
    }

    function handleLogin(){
        dispatch(loginTooggle())
    }

    async function searchResultFun(val){
        if(val == "") return
            const res = await fetch("https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/misc/place-autocomplete?input=" + val)
            const data = await res.json()
            setSearchResult(data.data)
    }

    async function fetchLatAndLng(id){
        if(id == "") return
            handleVisiblity()
                const res = await fetch("https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/misc/address-recommend?place_id=" + id)
                const data = await res.json()
                

                setCoord({
                    lat:data?.data[0]?.geometry?.location?.lat,
                    lng:data?.data[0]?.geometry?.location?.lng
                })
             setAddress(data?.data[0]?.formatted_address);             
                
    }
      
    




    return(
    <>
     
        <div className="w-full ">
                <div onClick={handleVisiblity} className={"w-full h-full bg-black/50 absolute z-30  " + (visible ? "visible" : "invisible")}> </div>
                <div className={"bg-white  w-[35%] h-full p-5 z-40 absolute duration-500  " + (visible ? "left-0" : "-left-[100%]")}>
                    <div className="flex flex-col w-full p-3 ">
                        <div className="flex flex-col sticky top-0 left-0">
                            <i onClick={handleVisiblity} className="fa-solid fa-xmark text-xl text-gray-600"></i> 
                            <input type="text" className="border py-3 px-6 focus:outline-none focus:shadow-lg mt-7 placeholder:font-semibold" placeholder="Search for area, street name"  onChange={(e) => searchResultFun(e.target.value)}/>
                        </div>
                        <div className="border pt-7 pl-6 mt-6 ">
                            <ul>
                                {
                                    searchResult.map((data,index) =>{
                                        const isLast = (index === searchResult.length -1)
                                        
                                        return(
                                        <div className="my-1" key={index}>
                                            <div className="flex gap-3 ">
                                                <i className="fa-solid fa-location-crosshairs mt-[0.3rem] text-gray-500 text-lg"></i>
                                                
                                                {
                                                    !isLast && <li onClick={() =>fetchLatAndLng(data.place_id)} className="cursor-pointer border-gray-400 border-dashed border-b-[0.5px] pb-5 w-full">
                                                    <div>
                                                        <p className="text-[1.1rem] font-medium hover:text-orange-600">{data.structured_formatting.main_text}</p>
                                                        <p className="text-xs opacity-65">{data.structured_formatting.secondary_text}</p>
                                                    </div>
                                                </li>
                                                }

                                                {
                                                    isLast && <li onClick={() =>fetchLatAndLng(data.place_id)} className="cursor-pointer">
                                                    <div>
                                                        <p className="text-[1.1rem] font-medium hover:text-orange-600">{data.structured_formatting.main_text}</p>
                                                        <p className="text-xs opacity-65">{data.structured_formatting.secondary_text}</p>
                                                    </div>
                                                </li>
                                                }
                                                
                                            </div>
                                        </div>
                                )})
                                
                            }
                            </ul>
                        </div>
                    </div>
                </div>
        </div>

        <div className="w-full ">
                <div onClick={handleLogin} className={"w-full h-full bg-black/50 absolute z-30  " + (loginVisible ? "loginVisible" : "invisible")}> </div>
                <div className={"bg-white  w-[35%] h-full p-5 z-40 fixed duration-500  " + (loginVisible ? "right-0" : "-right-[100%]")}>
                    <div className="flex flex-col w-full p-3 ">
                        <i onClick={handleLogin} className="fa-solid fa-xmark text-xl text-gray-600"></i> 
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold text-3xl border-b-2 border-black pb-1">Login</h2>
                            <img className="h-28" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" />
                        </div>
                        <SigninBtn/>
                        <p className="text-[0.77rem] text-gray-500 font-semibold">By clicking on Login, I accept the <span className="text-black">Terms & Conditions & Privacy Policy</span></p>
                    </div>
                </div>
        </div>

        <div className=" relative w-full  ">
            <div className="w-full sticky bg-white z-20 top-0 shadow-md h-20 flex items-center justify-center ">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
                    <div className=" flex items-center justify-between w-[95%] pl-2 pr-2">
                        <div className="flex items-center gap-5">
                            <Link to={"/"}>
                            <div  className="w-16 hover:scale-110 duration-300">
                                <img className=" " src="https://cdn.freelogovectors.net/wp-content/uploads/2023/11/swiggy_logo-freelogovectors.net_.png"/>
                            </div>

                            </Link>

                            <div className="flex items-center" onClick={handleVisiblity}>
                                <p className="flex items-center cursor-pointer">
                                    <span className="border-b-2 border-gray-600 text-gray-700 font-semibold  hover:text-orange-600 hover:border-orange-600">other</span>
                                    <span className="ml-2 mt-1 text-gray-500 text-[0.8rem] line-clamp-1 max-w-64">{address}</span>
                                </p>
                                <i className="fa-solid fa-angle-down ml-3 text-orange-600"></i>
                            </div>
                        </div>
              
                        <div className="flex items-center gap-14">
                        {
                            navItems.map((data,i) =>(
                                data. name == "Sidn In" ?
                                <div onClick={handleLogin} key={data.path}>
                                    <div key={i} className="flex items-center gap-3 cursor-pointer group">
                                        { userData ? <img className="h-10 rounded-full" src={userData.photo}/> :
                                            <i className={"text-gray-700 group-hover:text-orange-600 fa-solid fa" + data.image}></i>
                                        }
                                        <p className="text-[0.9rem] font-semibold text-gray-700 group-hover:text-orange-600">{userData ? userData.name : data.name}</p>
                                        {
                                            data.name == "Cart" && cartData.length >0 ? <p>{cartData.length}</p> : ""
                                        }
                                    </div>
                                </div> :
                                <Link to={data.path} key={data.path}>
                                <div key={i} className="flex items-center gap-3 cursor-pointer group">
                                    <i className={"text-gray-700 group-hover:text-orange-600 fa-solid fa" + data.image}></i>
                                    <p className="text-[0.9rem] font-semibold text-gray-700 group-hover:text-orange-600">{data.name}</p>
                                    {
                                        data.name == "Cart" && cartData.length >0 ? <p>{cartData.length}</p> : ""
                                    }
                                </div>
                            </Link>
                            ))
                        }
                        </div>
                    </div>
            </div>
            <Outlet/>
        </div>
    </>
    )
}

export default Head