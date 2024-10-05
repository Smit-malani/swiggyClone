import { createSlice } from "@reduxjs/toolkit";


const cartSlice =createSlice({
    name : "cartSlice",
    initialState : {
        cartItems : JSON.parse(localStorage.getItem("cartData")) || [],
        resinfo : JSON.parse(localStorage.getItem("resinfo")) || []
    },
    reducers : {
        addToCart : (state,action)=> {
           

            const {info,resinfo} =action.payload
            state.cartItems = [...state.cartItems , info]
            state.resinfo = resinfo
            localStorage.setItem("cartData",JSON.stringify(state.cartItems))
            localStorage.setItem("resinfo",JSON.stringify(resinfo))
        },
        deleteItem : (state,action) => {
            state.cartItems = action.payload
            localStorage.setItem("cartData" , JSON.stringify(action.payload))
        },
        clearCart : (state) => {
            state.cartItems = []
            state.resinfo = []
            localStorage.removeItem("cartData")
            localStorage.removeItem("resinfo")
        }
    }
})


export const{addToCart,deleteItem, clearCart} = cartSlice.actions
export default cartSlice.reducer