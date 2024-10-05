import React from "react";
import { useEffect,useState } from "react";

function OnYourMind({data}){

    const[val,setVal]=useState(0)


    function handlePre(){
        val <= 0 ? "" : setVal((prev) => prev - 29.3)
    }

    function handleNext(){
        val >= 250 ? "" :  setVal((prev) => prev + 29.3)
    }

    return(
        <>
            <div className="flex items-center justify-between">
                    <h1 className="font-bold text-2xl">What's on your mind?</h1>
                    <div className="flex items-center gap-3 text-lg pr-7">
                        <div onClick={handlePre} className={`rounded-full w-8 h-8 flex items-center justify-center cursor-pointer `+ (val <= 0 ? "bg-gray-100" : "bg-gray-200")}>
                            <i className={`fa-solid fa-arrow-left `+ (val <= 0 ? "text-gray-400" : "text-gray-800")}></i>
                        </div>
                        <div onClick={handleNext} className={`bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer `+ (val >=250 ? "bg-gray-100" : "bg-gray-200")}>
                            <i className={`fa-solid fa-arrow-right `+ (val >= 250 ? "text-gray-400" : "text-gray-800")}></i>
                        </div>
                    </div>
            </div>
            <div style={{translate:`-${val}%`}} className={`flex mt-3 duration-500 gap-7`}>
                 {
                    
                    data.map((item) => (
                        <img key={item.id} className="w-36 cursor-pointer" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`}></img>
                    ))
                }
            </div>
            <hr className="border mt-[3.2rem]"/> 
        </>
    )
}

export default OnYourMind