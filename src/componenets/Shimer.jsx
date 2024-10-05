import React from "react";

function Shimer(){
    return(
        <div className="w-full">
            <div className="w-full h-[350px] bg-slate-800 text-white flex justify-center items-center flex-col gap-5">
                <div className=" relative">
                    <img className="w-11  flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa" alt="" />
                    <span className="loader"></span>
                </div>
                <h1 className="text-2xl">Looking for great food neae you</h1>
            </div>
            <div className="w-[73%] mx-auto mt-3 mb-3">
                    <div className="grid grid-cols-4 gap-4">
                        {
                            Array(12).fill("").map((data,i) => (<div key={i} className='bg-gray-100 w-56 h-36 rounded-2xl'></div>))
                        }
                    </div>
            </div>
        </div>
    )
}

export default Shimer

export function MenuShimer(){
    return(
        <div className="w-full h-full ">
            <div className="w-[73%] min-h-[90vh] mx-auto my-auto flex flex-col items-center gap-5 mt-11">
                <div>
                    <div className="w-36 min-h-4 bg-slate-100 mb-3"></div>
                    <div className="flex justify-center gap-11">
                        <div>
                            <div className='bg-gray-100 w-[25rem] h-[15rem] rounded-2xl'></div>
                            <div className="w-48 min-h-3 bg-slate-100 mt-2"></div>
                            <div className="w-32 min-h-3 bg-slate-100 mt-2"></div>
                            <div className="w-20 min-h-3 bg-slate-100 mt-2"></div>
                        </div>
                        <div>
                            <div className='bg-gray-100 w-[25rem] h-[15rem] rounded-2xl'></div>
                            <div className="w-48 min-h-3 bg-slate-100 mt-2"></div>
                            <div className="w-32 min-h-3 bg-slate-100 mt-2"></div>
                            <div className="w-20 min-h-3 bg-slate-100 mt-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

