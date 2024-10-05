import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setFilterValue } from "../utils/filterSlice";

function OnlineFoodDelivery({data,title}){
    
    const filterOptions = ["Rating 4.0+","Offers","Rs.300-Rs.600","Less than Rs.300"]

    const [activeBtn,setActiveBtn] = useState(null)
    const dispatch =useDispatch()
    function handleFilterBtn(filterName){
        setActiveBtn(activeBtn === filterName ? null : filterName)
    }
    dispatch(setFilterValue(activeBtn))

    return(
        <div>
            <h1 className="text-2xl font-bold mt-7 mb-5">{title}</h1>
            <div className="mb-7 flex gap-3 items-center">
                {
                    filterOptions.map((filterName,i) =>(
                        <button key={i} className={"filterBtn flex items-center gap-1 " + (activeBtn === filterName ? "active": "")} onClick={() =>handleFilterBtn(filterName)}>
                            <p>
                                {filterName}
                            </p>
                        </button>
                    ))
                }
                
            </div>
            <div className="grid grid-cols-4 gap-7">
                {
                    data.map(({info,cta:{link}}) =>(
                        <Link key={info.id} to={`/restaurantMenue/${link.split("/").at(-1)}`}>
                        
                            <div className="hover:scale-95 duration-200 ">
                            <div key ={info.id} className="max-w-[12.5rem] h-[8rem] relative overflow-hidden ">
                                    <img className="object-cover rounded-2xl h-full w-full " src={`https://media-assets.swiggy.com/swiggy/image/upload/${info?.cloudinaryImageId}`}/>
                                <div className="bg-gradient-to-t from-gray-900 from-5% to-transparent to-35% w-full h-full absolute top-0 rounded-2xl"></div>
                                <p className="absolute bottom-0 text-white text-[1.2rem] ml-3 mb-[0.35rem] font-extrabold line-clamp-1 ">{(info?.aggregatedDiscountInfoV3?.header || "") + " "  + (info?.aggregatedDiscountInfoV3?.subHeader || "")}</p>
                            </div>
                            <div className=" mt-2 pl-2">
                                <h2 className="font-bold text-[1.125rem] line-clamp-1">{info.name}</h2>
                                <p className="flex items-center gap-1 pl-1 ">
                                    <div  className="h-[1.13rem] w-[1.13rem] flex items-center justify-center bg-green-700 rounded-full">
                                        <i className="text-[0.6rem] leading-[0.9rem] fa-solid fa-star text-white"></i>
                                    </div>
                                    <p className="font-[400] text-base leading-3 text-gray-900">{info?.avgRating}</p> 
                                    <span className="pb-2 leading-3 font-bold text-gray-900 text-base">.</span>
                                    <span className="font-[700] text-base leading-3 text-gray-800">{info?.sla?.slaString}</span>
                                </p>
                                <p className="text-gray-500 text-base leading-6 pl-1 line-clamp-1">{info?.cuisines.join(", ")}</p>
                                <p className="text-gray-500 text-base leading-6 pl-1">{info?.areaName}</p>
                            </div>
                            </div>                        
                        </Link>
                    ))
                 }
            </div>
            <hr className="border mt-[3.2rem]"/>
           
        </div>
    )
}

export default OnlineFoodDelivery