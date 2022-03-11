import { createSlice } from "@reduxjs/toolkit";

const initialConfigurationState = {
    benefits:[]
}

const ConfigurationSlice = createSlice({
    name:'configuration',
    initialState: initialConfigurationState,
    reducers:{

    }
})