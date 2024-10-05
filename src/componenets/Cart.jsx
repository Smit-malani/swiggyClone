import React from "react";
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, clearCart} from "../utils/cartSlice";
import toast from "react-hot-toast";
import { loginTooggle } from "../utils/toogleSlice";
let veg ="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/1200px-Veg_symbol.svg.png"
let nonVeg ="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/768px-Non_veg_symbol.svg.png"

function Cart(){
    
    const cartData = useSelector((state) => state.cartSlice.cartItems)
    const resinfo = useSelector((state) => state.cartSlice.resinfo)
    console.log(resinfo);
    

    const dispatch = useDispatch()
    const userData = useSelector((state) => state.authSlice.userData)
    
    let totalPrice = 0
    for(let i = 0; i<cartData.length; i++)
    {
        totalPrice = totalPrice + cartData[i].price/100 ||cartData[i].defaultPrice/100
    }

    function handleRemoveFromCart(i){
        if(cartData.length>1){
            let newArr=[...cartData]
            newArr.splice(i,1)        
            dispatch(deleteItem(newArr))
            toast.success("Food removed")
        }  else{
            handleClearCart();
            toast.success("cart is cleared")
        }
    }

    function handleClearCart(){
        dispatch(clearCart())
    }

    function handlePlaceOrder(){
        if(!userData){
                toast.error("Plese login first")
                dispatch(loginTooggle())
                return
        }
        toast.success("order placed")
        dispatch(clearCart())
    }


    if(cartData.length === 0){
        return <div className="h-[83vh] flex flex-col items-center justify-center">
                    <h1 className="text-gray-700 font-bold text-lg">Your cart is empty</h1>
                    <p className="text-xs text-gray-500 mt-3">You can go to home page to view more restaurants</p>
                    <Link to="/" className="text-blue-500"> 
                        <button className=" bg-orange-500 text-white px-5 py-2 font-bold mt-6">SEE RESTAURANTS NEAR YOU</button>
                    </Link>
                </div>
    }

    return(
        <div className="w-full">
            <div className="w-[50%] mx-auto">
                <div className="my-5 flex items-center justify-center">
                    <img className="w-[10rem] m-3 max-h-36 aspect-square object-cover cursor-pointer rounded-xl " src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${resinfo.imageId || resinfo.cloudinaryImageId}`} /> 
                    <div>
                        <p className="mt-1 text-4xl border-b-2 border-black ">{resinfo.name ? resinfo.name : ""}</p>
                        <p>{resinfo.areaName}</p>
                    </div>
                </div>
                <div>
                {
                    cartData.map(({name,defaultPrice,price,itemAttribute,ratings:{aggregatedRating:{rating,ratingCountV2}},description="",imageId},i) => {
                        
                        
                        return (  
                            <>
                            <div key={imageId} className="flex w-full justify-between min-h-[182px]">
                            <div className="w-[70%]">
                                <img className="w-5 rounded-md" src={(itemAttribute && itemAttribute?.vegClassifier === "VEG" ? veg : nonVeg)}/>
                                <h2 className="font-bold text-gray-700 text-lg">{name}</h2>
                                <p className="font-bold text-gray-800">₹{defaultPrice/100 || price/100}</p>
                                {
                                    rating?<div className="flex items-center mt-1 ml-1 mb-1"><i className="text-[0.65rem] leading-[0.9rem] fa-solid fa-star text-green-700 mt-1"></i> <span className="ml-1 font-bold text-sm text-green-700">{rating}</span><span className="font-semibold text-gray-600 text-xs">({ratingCountV2})</span></div>:""
                                }
                                <div>{description}</div>
                
                               
                            </div> 
                            <div className="w-[20%] relative">
                                {
                                    imageId?<img className="w-[10rem] max-h-36 object-cover cursor-pointer rounded-xl" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}/>:""
                                }
                                <button onClick={() => handleRemoveFromCart(i)} className=" px-5 py-1 absolute bottom-9 left-[7px] cursor-pointer  bg-white text-lg font-extrabold border text-red-600 rounded-lg  hover:bg-gray-200 hover:text-red-600 duration-150 ">Remove</button>

                            </div>   
                        </div>
                        <hr className="my-3"/>
                        </>     
                    )})}
                </div>
            <h1 className="font-bold text-lg opacity-70"> Total price = ₹{totalPrice}</h1>
            <div className="flex justify-between my-2">
                <button onClick={handlePlaceOrder} className=" px-5 py-2 bg-green-600 rounded-lg font-semibold text-white">Place Order</button>
                
                <button onClick={handleClearCart} className="bg-green-600 rounded-lg py-2 px-5 font-semibold text-white">Clear Cart</button>
            </div>

            </div>
        </div>
    )
}

export default Cart