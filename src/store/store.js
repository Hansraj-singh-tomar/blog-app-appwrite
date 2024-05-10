import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/authSlice"
import postsReducer from "./postSlice"
const store = configureStore({
    reducer: {
        auth: authReducer,
        postsData: postsReducer
    }
})

export default store;

