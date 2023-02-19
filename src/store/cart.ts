import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    count: 0,
    isLoaded: false
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCart: (state, action) => {
            state.count = state.count++
        },
        reduceCart: (state, action) => {
            state.count = state.count > 0 ? state.count-- : 0
        },
        updateCart: (state, action) => {
          state.isLoaded = false
        },
        setInitialCart: (state, action) => {
            state.count = action.payload
            state.isLoaded = true
        }
    }
})

export const {addCart, reduceCart, setInitialCart, updateCart} = cartSlice.actions
export default cartSlice.reducer