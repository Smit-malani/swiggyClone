import React from "react";

function SearchRestaurant({restaurant}){
    return(
        <>
            {
                restaurant.map(({card :{card :{info:{id,cloudinaryImageId,cuisines,aggregatedDiscountInfoV3 = {},promoted=false,name,avgRating,costForTwoMessage,sla :{slaString}}}}})=>(
                    <div key={id} className="bg-white min-h-[150px] m-2 flex items-center p-4">
                        <div className="relative w-[30%] items-center">
                            <div className="w-24 h-24 overflow-hidden rounded-lg">
                             {
                               cloudinaryImageId ?  <img className="aspect-square object-cover cursor-pointer rounded-lg" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${cloudinaryImageId}`}/> : <h1>no Images</h1>
                             }   
                                 
                            </div>
                        </div>
                        <div className="w-[70%]">
                            <p className="text-base font-bold text-gray-600 line-clamp-1">{name}</p>
                            <div className="flex items-center gap-1 text-[0.8rem] text-gray-500 font-semibold">
                                <i className="text-[0.7rem] mt-[2px] fa-solid fa-star text-gray-500"></i>
                                <p>{avgRating}</p>
                                <p className="mb-2">.</p>
                                <p>{slaString}</p>
                                <p className="mb-2">.</p>
                                <p>{costForTwoMessage}</p>
                            </div>
                            <p className="line-clamp-1 text-[0.85rem] text-gray-500 opacity-80 font-semibold">{cuisines.join()}</p>
                        </div>
                    </div>
                    
                ))
            }
        </>
    )
}

export default SearchRestaurant