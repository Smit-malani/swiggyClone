import React, {useContext, useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import { Coordinates } from "../context/contextApi";
import { useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import AddToCartBtn from "./AddToCartBtn";
import { MenuShimer } from "./Shimer";

let veg ="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/1200px-Veg_symbol.svg.png"
let nonVeg ="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/768px-Non_veg_symbol.svg.png"

function RestorentMenu(){

    const {id} = useParams()
    let mainId = id.split("-").at(-1)
    let restId = mainId.split("t")[1]
    

    const[resinfo,setResinfo]=useState([])
    const[offersData,setOffersData]=useState([])
    const[topPicks,setTopPicks]=useState(null)
    const[menuData,setMenuData] = useState([])
    const[val,setval]=useState(0)
    const{coord:{lat,lng}}=useContext(Coordinates)

    function handleNext(){
        val >= 40 ? "" :  setval((prev) => prev + 42)
        console.log(val);
        
        
    }
    
    function handlePre(){
        val <= 0 ? "" : setval((prev) => prev - 42)
    }

    

    async function fetchMenue() {
        let data = await fetch(`${import.meta.env.VITE_BASE_URL}/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restId}&catalog_qa=undefined&submitAction=ENTER`)
        let res = await data.json()


        let actualMenu = (res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter((data) => data?.card?.card?.itemCards || data?.card?.card?.categories )
       


        setResinfo(res?.data?.cards[2]?.card?.card?.info)
        setOffersData(res?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers)
        setMenuData(actualMenu)
        setTopPicks((res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter((data) => data?.card?.card?.title=="Top Picks")[0])
        
    }


    useEffect(() =>{
        fetchMenue()
    },[])
    
    return (
        <div className="w-full">
            {
                menuData.length ? (<div className="pt-7 w-[800px] mx-auto">
                    <p className="text-[0.6rem] text-gray-500 ">
                      <Link to={"/"}>
                      <span className="hover:text-gray-700 hover:cursor-pointer">Home /</span>
                      </Link>
                      <Link to={"/"}>
                      <span className="hover:text-gray-700 hover:cursor-pointer">
                          {resinfo.city} / 
                      </span>
                      </Link>
                      <span className="text-gray-700 font-semibold">
                          {resinfo.name}
                      </span> 
                    </p>
      
                    <h1 className="text-2xl font-bold pl-5 mt-10">{resinfo?.name}</h1>
                    
                    <div className="w-full max-h-[206px] bg-gradient-to-t from-slate-200 mt-5 rounded-[2rem] pl-3 pr-3 pb-4 ">
                          <div className="w-full border border-slate-200 rounded-3xl  h-full bg-white pt-5 ">
                              <div className="flex items-center gap-2 pl-3">
                                  <div  className="h-[1.13rem] w-[1.13rem] flex items-center justify-center mt-1 bg-green-700 rounded-full">
                                      <i className="text-[0.6rem] leading-[0.9rem] fa-solid fa-star text-white"></i>
                                  </div>
                                  <h1 className="font-bold flex items-center">
                                      {resinfo.avgRating} 
                                      <span>({resinfo.totalRatingsString})</span>
                                      <span className="pb-2 pl-2 pr-2 leading-3 font-bold text-gray-400 text-xl">.</span>
                                      <span>{resinfo.costForTwoMessage}</span>
                                  </h1>
                              </div>
                              <p className="text-sm font-bold underline text-orange-600 pl-4 pt-1">{resinfo?.cuisines?.join(",")}</p>
                              <div className="flex gap-2 pl-4 pt-2">
                                  <div className=" w-[0.4rem] flex flex-col justify-center items-center">
                                      <div className="w-[0.4rem] h-[0.4rem] bg-gray-300 rounded-full"></div>
                                      <div className="w-[0.125rem] h-[1.6rem] bg-gray-300 rounded-full ml-[0.016rem]"></div>
                                      <div className="w-[0.4rem] h-[0.4rem] bg-gray-300 rounded-full"></div>
                                  </div>
                                  <div className=" flex flex-col gap-2 font-semibold text-sm pb-1">
                                      <p className="font-bold">Outlet <span className="font-normal text-gray-500">{resinfo?.areaName}</span></p>
                                      <p className="font-bold lowercase">{resinfo?.sla?.slaString}</p>
                                  </div>
                              </div>
      
                              <hr className="mt-3"/>
                              <div className="w-full">
                                  {
                                      resinfo?.expectationNotifiers ?
                                       <div className="flex items-center p-4 gap-2">
                                           <img className="w-5" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_40,h_40/${resinfo?.feeDetails?.icon}`}/> : ""
                                          <p className="text-gray-500 text-sm font-medium">{resinfo?.expectationNotifiers[0]?.text}</p> : ""
                                      </div> : "" 
                                  }
                                  
                              </div>
                          </div>  
                    </div>
                    
                    <div className="w-full overflow-hidden">
                          <div className="flex items-center justify-between mt-6">
                              <h1 className="font-bold text-[1.3rem] cursor-pointer pl-5">Deals for you</h1>
                              <div className="flex items-center gap-3 text-lg pr-7">
                                  <div onClick={handlePre} className={`rounded-full w-8 h-8 flex items-center justify-center cursor-pointer `+ (val <= 0 ? "bg-gray-100" : "bg-gray-200")}>
                                      <i className={`fa-solid fa-arrow-left `+ (val <= 0 ? "text-gray-400" : "text-gray-800")}></i>
                                  </div>
                                  <div onClick={handleNext} className={`rounded-full w-8 h-8 flex items-center justify-center cursor-pointer `+  (val >= 40 ?  "bg-gray-100" : "bg-gray-200")}>
                                      <i className={`fa-solid fa-arrow-right `+ (val >= 40 ? "text-gray-400" : "text-gray-800")}></i>
                                  </div>
                              </div>
                          </div>
                          <div className="flex gap-11 pl-4 duration-500" style={{translate:`-${val}%`}} >     
                              {
                                  offersData.map((data,i)=>(
                                      <Discount key={i} data={data}/>
                                  ))
                              
                              }
                          </div>
                    </div>
                    
                    <h2 className="text-center text-sm tracking-[0.15em] text-gray-500 font-semibold mt-10">MENU</h2>
                    
                    <div className="w-[768px] mt-5 ml-5 cursor-pointer bg-gray-200/50 rounded-xl py-3 flex items-center justify-center relative">
                          <div className="font-semibold text-gray-600">Search for dishes</div>
                          <i className="text-gray-500 absolute right-3 fa-solid fa-magnifying-glass"></i>
                    </div>
                    <hr className="mt-5 mx-3"/>
                      { topPicks && <div className="w-full overflow-hidden">
                                          <div className="flex items-center justify-between mt-8">
                                              <h1 className="font-bold text-[1.3rem] cursor-pointer ml-3">{topPicks?.card?.card?.title}</h1>
                                              <div className="flex items-center gap-3 text-lg ">
                                                  <div onClick={handlePre} className={`rounded-full w-8 h-8 flex items-center justify-center cursor-pointer `+ (val <= 0 ? "bg-gray-100" : "bg-gray-200")}>
                                                      <i className={`fa-solid fa-arrow-left `+ (val <= 0 ? "text-gray-400" : "text-gray-800")}></i>
                                                  </div>
                                                  <div onClick={handleNext} className={`rounded-full w-8 h-8 flex items-center justify-center cursor-pointer `+  (val >= 40 ?  "bg-gray-100" : "bg-gray-200")}>
                                                      <i className={`fa-solid fa-arrow-right `+ (val >= 40 ? "text-gray-400" : "text-gray-800")}></i>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="gap-3 flex mt-5"  >     
                                              {
                                                  topPicks.card.card.carousel.map(({creativeId,dish:{info: {defaultPrice,price,id}}}) =>(
                                                      <div key={id} className="min-w-[270px] h-[270px] rounded-xl overflow-hidden relative">
                                                          <img className="w-full h-full object-cover" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/" +creativeId }alt="" srcset="" />
                                                          <div className="absolute text-white bottom-9 flex justify-between items-center w-full px-3 ">
                                                              <p className="font-medium">₹{defaultPrice/100 || price/100}</p>
                                                              <button className="px-9 py-1 cursor-pointer text-green-600/80 text-lg font-extrabold border bg-white rounded-lg hover:bg-gray-200 duration-150">ADD</button>
                                                          </div>
                                                      </div>
                                                  ))
                                              }
                                          </div>
                                          <hr className="mt-5 border-[8px]"/>
                                  </div>
                      }
                    
                    <div className="">
                      {
                          menuData.map(({card: {card}} , i) => (
                              
                              <MenuCard card={card} key={i} resinfo={resinfo}/>
                          ))
      
                      }
                    </div>
                 </div>) : <MenuShimer/>
            }

           
        </div>
    )
}

function MenuCard({card,resinfo}){

    let val = false
    

    if(card["@type"])
    {
        val = true

    }


    const[isOpen,setIsOpen] = useState(val)


    function toggleDropDown(){

        setIsOpen((prev) => !prev)
    }    

    if(card.itemCards){
        const{title,itemCards}=card
        return (
            <>
                <div className="mt-6 pl-4">
                    <div className="flex justify-between ">
                        <h1 className={"font-bold text-" + (card["@type"]? "xl" : "base")}>{title}({itemCards.length})</h1>                                    
                        <i className={"mr-5 fa-solid fa-angle-"+(isOpen ? "up" : "down")} onClick={toggleDropDown}></i>
                    </div>
                    {
                        isOpen && <DetailMenue itemCards={itemCards} resinfo={resinfo}/>
                    }
                    
                
                </div>

                    <hr className={" my-5 border-" + (card["@type"] ? "[8px]" : "[4px]")}/>
                   
                    
            </>
        )

    }
    else{
        const{title,categories} = card
        return(
            <div className="">
               
                <h1 className="font-bold text-xl pl-4">{card.title} </h1>
                
                {
                    categories.map((data ,i)=>(
                        <MenuCard key={i} card={data} resinfo={resinfo}/>
                    ))
                }
                <hr className={" my-5 border-" + (card["@type"] ? "[8px]" : "[4px]")}/>
            </div>
        )
    }

    
}

function DetailMenue({itemCards, resinfo}){
      return(
        <div className="my-5">
            {  
                itemCards.map(({card :{info}}) =>(
                    <DetailMenueCard key={info.id} info={info} resinfo={resinfo}/>
                ))
            }
        </div>
    )
}

function DetailMenueCard({info,resinfo}){
    
    const {name,defaultPrice,price,itemAttribute,ratings:{aggregatedRating:{rating,ratingCountV2}},description="",imageId} = info
    
    const [isDiffer,setIsDeffer] = useState(false)    
    const dispatch = useDispatch()

    function handleIsDiffer(){
        setIsDeffer((pre) => !pre)
    }

    function handleClearCart(){
        dispatch(clearCart())
        handleIsDiffer()
    }
                    
        const[isMore,setIsMore] = useState(false)
        
        let trimdesc = description.substring(0,135) 
        
        
        return(
     
   <>
        <div className="flex w-full justify-between min-h-[182px]">
            <div className="w-[70%]">
                
                <img className="w-5 rounded-md" src={(itemAttribute && itemAttribute?.vegClassifier === "VEG" ? veg : nonVeg)}/>
                <h2 className="font-bold text-gray-700 text-lg">{name}</h2>
                <p className="font-bold text-gray-800">₹{defaultPrice/100 || price/100}</p>
                {
                    rating?<div className="flex items-center mt-1 ml-1 mb-1"><i className="text-[0.65rem] leading-[0.9rem] fa-solid fa-star text-green-700 mt-1"></i> <span className="ml-1 font-bold text-sm text-green-700">{rating}</span><span className="font-semibold text-gray-600 text-xs">({ratingCountV2})</span></div>:""
                }
                
                
                {
                    description.length>135 ?<div>
                    <span className="text-gray-500 font-normal text-[1rem] cursor-pointer text-justify">{isMore?description:trimdesc}</span>
                    {
                       description.length>135 && <button className="font-bold text-gray-500 text-[1rem]" onClick={() =>setIsMore(!isMore)}>{isMore ? "...less" : "...more"}{isMore}</button>
                    }

                </div> : <span className="text-gray-500 font-normal text-[1rem] cursor-pointer">{trimdesc}</span>

                }
                
            </div> 

            <div className="w-[20%] relative">
                {
                    imageId?<img className="w-[10rem] max-h-36 object-cover cursor-pointer rounded-xl" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}/>:""
                }
                <AddToCartBtn info={info} resinfo={resinfo} handleIsDiffer={handleIsDiffer}/>
            </div>   
        </div>
        <hr className="my-5"/>
        {
            isDiffer && (
            <div className="w-full flex justify-center relative">
                <div className="w-[520px] h-[204px] border shadow-lg fixed z-10 bottom-10 bg-white flex flex-col p-7">
                    <h1 className="font-bold text-lg text-gray-800 mb-2">Item alredy in cart</h1>
                    <p className="text-gray-700 text-[0.8rem] font-normal">Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</p>
                    <div className="flex justify-evenly gap-3 mt-5">
                        <button className="w-full p-2 font-semibold text-[#60B246] border-2 border-[#60B246] hover:shadow-lg" onClick={handleIsDiffer}>NO</button>
                        <button className="w-full p-2 font-semibold bg-[#60B246] text-white border-2 border-[#60B246] hover:shadow-lg " onClick={handleClearCart}>YES,START AFRESH</button>
                    </div>
                </div>
            </div>
            )

        }
   </>     
        
    )
}



function Discount({data : {info:{header, offerLogo, couponCode}}}){

    return(
        <div className="flex  min-w-[328px] h-[76px] border mt-3 p-3 rounded-2xl gap-3 cursor-pointer">
            <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/${offerLogo}`}/>
            <div>
                <h2 className="font-extrabold">{header}</h2>
                <p className="font-bold text-gray-400 text-sm">{couponCode}</p>
            </div>
        </div>
    )
    
}

export default RestorentMenu