import React from "react";
import { addToCart } from "../utils/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

function AddToCartBtn({info,resinfo,handleIsDiffer}){

    const cartData = useSelector((state) => state.cartSlice.cartItems)
    const infoFromLocalStoreg = useSelector((state) => state.cartSlice.resinfo)
    const dispatch = useDispatch()


    function handleAddToCart(){
        const isAdded = cartData.find((data) => data.id === info.id)
     
        
        if(!isAdded){
            if(infoFromLocalStoreg.name=== resinfo.name || infoFromLocalStoreg.length === 0 ){
               
                dispatch(addToCart({info ,resinfo}))
                toast.success("Food added to the cart succesfully")
            }else{
                toast.error("different Restorent")
                handleIsDiffer()
            }
            
        }else{
            toast.error("Alredy Added")
        }        

    }
    return(
        <div>
                <button
                 onClick={handleAddToCart}
                 className="px-9 py-1 absolute bottom-[1.4rem] cursor-pointer left-5 text-green-600/80 text-lg font-extrabold border bg-white rounded-lg  hover:bg-gray-200 duration-150">ADD</button> 

        </div>
    )
}

export default AddToCartBtn