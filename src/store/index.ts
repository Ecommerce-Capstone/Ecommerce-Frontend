import {combineReducers, configureStore} from "@reduxjs/toolkit"
import searchReducer from "./search";
import cartReducer from "./cart"

export const store = configureStore({
    reducer: {
        search: searchReducer,
        cart: cartReducer
    },
})

export default store