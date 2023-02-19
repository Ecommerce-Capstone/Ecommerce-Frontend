import {combineReducers, configureStore} from "@reduxjs/toolkit"
import searchReducer from "./search";

export const store = configureStore({
    reducer: {
        search: searchReducer
    },
})

export default store