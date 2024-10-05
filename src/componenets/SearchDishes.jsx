import React from "react";
import { nonVeg, veg } from "../utils/links";
import AddToCartBtn from "./AddToCartBtn";





function SearchDishes({dishes}){
        

    return(
        <>
            
            {
                dishes.map(({card :{card :{info ,restaurant:{info:resinfo}}}}) =>{
                    let {imageId = "",name,price,isVeg = 0} = info
                    let {id,name : resName,avgRating,sla:{slaString}} = resinfo
                    
                     return(  
                        <div key={id} className="bg-white min-h-[250px] m-2 p-4 rounded-3xl">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col items-start justify-center">
                                    <p className="text-gray-600 font-bold text-sm opacity-80">By {resName}</p>
                                    <p className="text-gray-500 text-xs mr-1 my-2 font-medium opacity-80"><i className="text-xs fa-solid fa-star mr-1"></i>{avgRating} . {slaString}</p>
                                </div>
                                <i className="fa-solid fa-arrow-right text-gray-600 opacity-80"></i>
                            </div>
                            <hr className="my-2 border-dashed"/>
                            <div className="flex items-start mt-5">
                                <div className=" w-52">
                                    <div className="h-5 w-5">
                                        {
                                            isVeg ? <img src={veg} alt="" /> : <img src={nonVeg} alt="" />
                                        }
                                    </div>
                                    <p className="text-lg opacity-70 font-bold ">{name}</p>
                                    <p className="text-[0.9rem] font-semibold">₹{price/100}</p>
                                    <button className="border-[1px] border-gray-400 text-gray-500 text-[0.85rem] rounded-2xl font-semibold px-2 py-[2px] mt-4">More Details<i className="ml-2 text-xs fa-solid fa-angle-right"></i></button>
                                </div>
                                <div className=" relative">
                                    <div className="w-[10rem] h-32 overflow-hidden rounded-2xl ">
                                        {
                                            imageId?<img className="aspect-square object-cover cursor-pointer rounded-xl" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}/>:<h1 className="text-center text-lg font-bold opacity-50">No Image</h1>
                                        }
                                    </div>
                                    <div className=" absolute bottom-[-35px]">
                                        <AddToCartBtn info={info} resinfo={resinfo}/>
                                    </div>
                                </div>  
                            </div>
                        </div>
                    )})
                }
            </>
        )
    }

export default SearchDishes