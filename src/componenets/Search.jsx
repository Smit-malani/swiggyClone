import React, { useContext, useEffect, useState } from "react";
import SearchDishes from "./SearchDishes";
import SearchRestaurant from "./SearchRestaurant";
import { Coordinates } from "../context/contextApi";

function Search(){

    const[searchQuery,setSearchQuery] = useState("")
    const[dishes,setDishes] = useState([])
    const[restaurant,setRestaurant] = useState([])
    const filterOptions = ["Restaurant","Dishes"]
    const [activeBtn,setActiveBtn] = useState("Dishes")
    const{coord:{lat,lng}}=useContext(Coordinates)

    
    
    function handleFilterBtn(filterName){
        setActiveBtn(activeBtn === filterName ? activeBtn : filterName)
    }

  
    async function fetchDishes(){
        let data = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=undefined&submitAction=ENTER&queryUniqueId=cebae667-ef3b-4e95-83fd-89d610f3025d`)
        let res = await data.json()
        let finalData = (res?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards).filter((data)=>data?.card?.card?.info)
        setDishes(finalData)
        
    }

    async function fetchRestaurant(){
        let data =await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=undefined&submitAction=ENTER&queryUniqueId=cebae667-ef3b-4e95-83fd-89d610f3025d&selectedPLTab=RESTAURANT`)
        let res = await data.json()
        let finalData = (res?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards).filter((data)=>data?.card?.card?.info)
        setRestaurant(finalData)
        
    }

    function handleSearchQuery(e){
        let val= e.target.value
        if(e.keyCode == 13){
            setSearchQuery(val)
            setDishes([])
        }
    }


    useEffect(()=>{
        if(searchQuery === ""){
            return
        }
        setSearchQuery("")
        fetchDishes()
        fetchRestaurant()
    },[searchQuery])



    return(
        
        <div className="w-full flex items-center justify-center ">
            
                <div className="w-[65%] ">
                    <div className="w-full mt-10 flex items-center justify-between border-[1px] border-gray-400 rounded-md p-3">
                        <input className="text-gray-500 focus:outline-none w-full" type="text" placeholder="Search for restaurants"  onKeyDown={handleSearchQuery}/>
                        <i className="text-gray-500 fa-solid fa-magnifying-glass"></i>
                    </div>
                    {
                        <div className="mt-3 flex gap-3 items-center">
                        {
                            filterOptions.map((filterName,i) =>(
                                <button key={i} className={"filterBtn flex items-center gap-1  " + (activeBtn === filterName ? "active": "")} onClick={() =>handleFilterBtn(filterName)}>
                                    <p>
                                        {filterName}
                                    </p>
                                </button>
                            ))
                        }
                    </div>
                    }
                    
                    <div className="bg-[#f4f5f7] mt-5 grid grid-cols-2 p-2">
                        {
                            activeBtn == "Dishes" ? <SearchDishes dishes={dishes}/> : <SearchRestaurant restaurant={restaurant}/>
                        }
                    </div>
                </div>
            
           
        </div>
    )
}

export default Search