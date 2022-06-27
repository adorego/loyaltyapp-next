import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    notification:{
        show:false,
        message:"Hubo un error",
        color:"green"
    },
    loading:false
}

const uiSlice = createSlice({
    name:'ui',
    initialState:initialState,
    reducers:{
        showNotification(state, action){
            state.notification = action.payload;
            state.loading = state.loading;
        },
        setLoading(state, action){
            state.loading = action.payload,
            state.notification = state.notification
        }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice;