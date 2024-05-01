import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/authSlice"
const store = configureStore({
    reducer: {
        auth: authReducer,
        // we can add more reducers here ...
    }
})

export default store;

