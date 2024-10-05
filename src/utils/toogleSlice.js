import { createSlice } from "@reduxjs/toolkit";



const toogleSlice = createSlice({
    name : "toogleSlice",
    initialState : {
        searchBarToogle : false,
        loginTooggle : false,
    },
    reducers:{
        toogleSearchBar : (state)=>{
            state.searchBarToogle = !state.searchBarToogle
        },
        loginTooggle : (state) => {
            state.loginTooggle = !state.loginTooggle
        },
      
    }
})

export const {toogleSearchBar , loginTooggle} = toogleSlice.actions
export default toogleSlice.reducer