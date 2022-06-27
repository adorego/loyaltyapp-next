import { CampaignType } from './../data/Configuration/Campaign';
import Benefit from "../data/Configuration/Benefit";
import LandingSectionInterface from "../data/Configuration/LandingSection-interface";
import PremioInterface from '../data/Configuration/Premio-interface';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialConfigurationState = {
    isUpdated:false,
    isConfigured:false,
    pointsConversion:{
        id:"",
        points:"",
        money:""
    },
    colorsApp:{
        headerColor:"",
        textHeaderColor:""
    },
    rewards:Array<PremioInterface>(),
    benefits:Array<Benefit>(),
    selectedBenefit:<Benefit>{},
    benefitSelectionCaller:"",
    selectedCampaignType:0,
    landingCreation:{
        selectedLandingType:<string>"",
        selectedSections:Array<LandingSectionInterface>(),
        currentSection:<number>0
    }

}

const configurationSlice = createSlice({
    name:'configuration',
    initialState: initialConfigurationState,
    reducers:{
        load_configuration:(state, action) =>{
            state.pointsConversion.id = action.payload.id;
            state.pointsConversion.points =  action.payload.points;
            state.pointsConversion.money = action.payload.money;
            state.isUpdated = true;

        },
        add_reward:(state, action) =>{
            state.rewards.push(action.payload);
        },
        load_rewards:(state, action) =>{
            state.rewards = action.payload;
        },
        add_benefit:(state, action) =>{
            state.benefits.push(action.payload);
        },
        load_benefits:(state, action) =>{
            state.benefits = action.payload;
        },
        select_benefit:(state, action: PayloadAction<Benefit>) =>{
            state.selectedBenefit = action.payload;
        },
        setBenefitSelectionCaller:(state, action) =>{
            state.benefitSelectionCaller = action.payload;
        },
        setCampaignType:(state, action: PayloadAction<CampaignType>) =>{
            state.selectedCampaignType = action.payload;
        },
        // updateLandingCreation:(state, action: PayloadAction<>) =>{

        // }
        

    }
});

export default configurationSlice;
export const configurationActions = configurationSlice.actions;