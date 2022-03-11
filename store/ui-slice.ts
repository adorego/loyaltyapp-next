import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    notification:{
        show:false,
        message:"Hubo un error"
    },
    loading:false
}

const uiSlice = createSlice({
    name:'ui',
    initialState:initialState,
    reducers:{
        showNotification(state, action){
            state.notification = action.payload;
        },
        setLoading(state, action){
            state.loading = action.payload
        }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice;