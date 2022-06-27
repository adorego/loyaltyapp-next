import { createSlice } from '@reduxjs/toolkit';

const authInitialState = {
    isLogged:false,
    user:{
        _id:"",
        email:"",
        admin:false,
        university_id:"",
        verified:false,
        verification_code:""
        

    },
    university:{
        _id:"",
        normalize_name:"",
        name:"",
        sigla:"",
        logo:"",
        frontEndCompletePath:"",
        color_configuration:{
            main:""
        }
    }
    
}

const authSlice = createSlice({
    name:"auth",
    initialState:authInitialState,
    reducers:{
        validate_email(state){
            state.isLogged = true;
            state.user.verified = true;
        },
        register(state, action){
            const user = action.payload.user;
            const university = action.payload.university;
            state.isLogged = false;
            state.user = user;
            state.university = university;
        },
        login(state, action){
            const user = action.payload.user;
            const university = action.payload.university;
            state.isLogged = true;
            state.user = {...user};
            state.university = {...university};
        },
        logout(state){
            state.isLogged = false;
            state.university = authInitialState.university;
            state.user = authInitialState.user;

        },
        load_logo(state, action){
            state.university.frontEndCompletePath = action.payload.frontEndCompletePath;
            state.university.logo = action.payload.logo;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice;