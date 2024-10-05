import React, { useContext, useEffect, useState } from "react";
import OnYourMind from "./OnYourMind";
import TopRestorent from "./TopRestro";
import OnlineFoodDelivery from "./OnlineFoodDelivery";
import { Coordinates } from "../context/contextApi";
import { useSelector } from "react-redux";
import Shimer from "./Shimer";


function Body(){
    const [topRestorentData,setTopRestorentData] = useState([])
    const [onYourMindData,setOnYourMindData] = useState([])
    const [topResTitle,setTopResTitle] = useState("")
    const [onlineTitle,setOnlineTitle] = useState("")
    const[data,setData] = useState({})
    const{coord:{lat,lng}}=useContext(Coordinates)
    

    async function fetchData() {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
        const result = await res.json()

        setData(result?.data)
        setTopResTitle(result?.data?.cards[1]?.card?.card?.header?.title)
        setOnlineTitle(result?.data?.cards[2]?.card?.card?.title)
        setTopRestorentData(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        setOnYourMindData(result?.data?.cards[0]?.card?.card?.imageGridCards?.info) 
    }    

        useEffect(() =>{
            fetchData()
        },[lat,lng])

        const filterVal = useSelector((state =>state.filterSlice.filterVal))
        
        

        const filteredData = topRestorentData.filter(item =>{
            if(!filterVal) return
            switch(filterVal){
                case "Rating 4.0+" : return item?.info?.avgRating > 4  
                case "Offers" : return item?.info?.aggregatedDiscountInfoV2 == null
                case "Rs.300-Rs.600" : return item?.info?.costForTwo?.slice(1,4) >= "300" && item?.info?.costForTwo?.slice(1,4) <= "600"
                case "Less than Rs.300" : return item?.info?.costForTwo?.slice(1,4) < "300"
                    default : return true
            }            
        }) 

    if(data.communication){
        return (
            <div className="flex flex-col items-center justify-center h-[86vh]">
                <img className="h-60 " src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png" alt="" srcset="" />
                <h1 className="text-xl font-bold">{data?.cards[0]?.card?.card?.title}</h1>
            </div>
        )
}
    

    return(
        <div className="w-ful">
            {
                    topRestorentData.length ? (<div className="w-[73%] m-auto  mt-3 overflow-hidden">
                        <OnYourMind data={onYourMindData}/>
                        <TopRestorent data={topRestorentData} title={topResTitle}/>
                        <OnlineFoodDelivery data={filterVal ?  filteredData : topRestorentData} title={onlineTitle}/>
                    </div>) : <Shimer/>
            
            }
            
            
        </div>
    )
}

export default Body