import authSlice from "./auth-slice";
import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";

const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        ui: uiSlice.reducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch