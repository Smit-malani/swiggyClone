import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function TopRestorent({data,title}){

    
    const[val,setVal]=useState(0)

    function handlePre(){
        val <= 0 ? "" : setVal((prev) => prev - 50)
    }

    function handleNext(){
        val >= 550? "" :  setVal((prev) => prev + 50)
    }

    return(
        
          <> 
            <div className="flex items-center justify-between mt-11 ">
                    <h1 className="font-bold text-2xl">{title}</h1>
                    <div className="flex items-center gap-3 text-lg pr-7">
                        <div onClick={handlePre} className={`rounded-full w-8 h-8 flex items-center justify-center cursor-pointer `+ (val <= 0 ? "bg-gray-100" : "bg-gray-200")}>
                            <i className={`fa-solid fa-arrow-left `+ (val <= 0 ? "text-gray-400" : "text-gray-800")}></i>
                        </div>
                        <div onClick={handleNext} className={`bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer `+ (val >=550 ? "bg-gray-100" : "bg-gray-200")}>
                            <i className={`fa-solid fa-arrow-right `+ (val >= 550 ? "text-gray-400" : "text-gray-800")}></i>
                        </div>
                    </div>
            </div>
            <div style={{translate:`-${val}%`}} className={`flex mt-3 duration-500 w-full gap-7`}>
                 {
                    data.map(({info ,cta:{link}}) =>(
                        
                         
                        <Link key ={info.id} to={`/restaurantMenue/${link.split("/").at(-1)}`}>
                            
                        <div className="hover:scale-95 duration-200 ">
                            {/* <RestorentCard {...info}/> */}
                            <div  className="min-w-[17rem] h-[11.5rem] relative cursor-pointer ">
                                <img className="w-full h-full object-cover  rounded-2xl " src={`https://media-assets.swiggy.com/swiggy/image/upload/${info?.cloudinaryImageId}`}/>
                                <div className="bg-gradient-to-t from-gray-900 from-5% to-transparent to-35% w-full h-full absolute top-0 rounded-2xl"></div>
                                <p className="absolute bottom-0 text-white text-[1.2rem] ml-3 mb-[0.35rem] font-extrabold">{(info?.aggregatedDiscountInfoV3?.header || "") + " "  + (info?.aggregatedDiscountInfoV3?.subHeader || "")}</p>
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
            <hr className="border mt-[3.6rem]"/> 
        
            </> 
    )
}

export default TopRestorent