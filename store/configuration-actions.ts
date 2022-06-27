import { AnyAction } from 'redux';
import PointsToMoney from '../data/Configuration/PointToMoney-interface';
import PointsToMoneyInterface from '../data/Configuration/PointToMoney-interface';
import PremioInterface from '../data/Configuration/Premio-interface';
import {RootState} from './index';
import SectionInterface from '../data/Configuration/Section-interface';
import { ThunkAction } from "@reduxjs/toolkit";
import { configurationActions } from "./configuration-slice";
import { uiActions } from "./ui-slice";

export const fetchConfigurationData = 
(universityId:string|string[]):ThunkAction<void, RootState, unknown, AnyAction> => 
{
    return async (dispatch) =>{
        const fetchData = async() =>{
            
            dispatch(uiActions.setLoading(true));
            const result = await fetch(`/api/configuration/${universityId}/points_equivalence`);
            const resultObject = await result.json();
            if(!result.ok){
                dispatch(uiActions.showNotification({show:true, message:resultObject.name}));
                
            }else{
                // console.log('ResultObject:', resultObject);
                dispatch(configurationActions.load_configuration(resultObject));
                
                
            }
        };
        try{
            fetchData();
             
            
        }catch(error:any){
            dispatch(uiActions.showNotification({show:true, message:error.message}));
        }
    }
}

export const savePointToMoneyConfigurationData = 
(universityId:string|string[], data:PointsToMoney):ThunkAction<void, RootState, unknown, AnyAction> => 
{
    return async (dispatch) =>{
        const savePointToMoneyData = async() =>{
            
            dispatch(uiActions.setLoading(true));
            let result;
            if(data.id && data.id.length > 0 ){
                // console.log('Entro en PUT');
                result = await fetch(`/api/configuration/${universityId}/points_equivalence/${data.id}`,{
                    method:'PUT',
                    body:JSON.stringify({
                        points:data.points,
                        money:data.money
                    })
                });
            }else{
                // console.log('Entro en POST');
                result = await fetch(`/api/configuration/${universityId}/points_equivalence`,{
                    method:'POST',
                    body:JSON.stringify({
                        ...data
                    })
                });
            }
            const resultObject = await result.json();
           
            dispatch(uiActions.setLoading(false));
            if(result.ok){
                const payload:PointsToMoneyInterface = {
                    id: resultObject._id,
                    points:resultObject.points,
                    money:resultObject.money
                }
                
                dispatch(configurationActions.load_configuration(payload));
                
            }else{
                dispatch(uiActions.showNotification({show:true, message:resultObject.name}));
            }
        }

        try{
            await savePointToMoneyData();
        }catch(error:any){
            dispatch(uiActions.showNotification({show:true, message:error.message}));
        }
    }


}

export const saveRewardConfigurationData = 
(universityId:string|string[], reward:PremioInterface):ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch) => {
        const saveRewardData = async() =>{
            dispatch(uiActions.setLoading(true));
            let result;
            const body = new FormData();
            body.append('image', reward.image_blob );
            body.append('title', reward.title);
            body.append('description', reward.description);
            body.append('premioType', reward.premioType);
            body.append('monto', String(reward.monto));
            body.append('equivalente_puntos', String(reward.equivalente_puntos));

            if(reward.id && reward.id.length > 0 ){
                // console.log('Entro en PUT');
                result = await fetch(`/api/configuration/${universityId}/reward/${reward.id}`,{
                    method:'PUT',
                    body
                });
            }else{
                // console.log('Entro en POST');
                const body = new FormData();
                body.append('image', reward.image_blob );
                body.append('title', reward.title);
                body.append('description', reward.description);
                body.append('premioType', reward.premioType);
                body.append('monto', String(reward.monto));
                body.append('equivalente_puntos', String(reward.equivalente_puntos));

                result = await fetch(`/api/configuration/${universityId}/reward`,{
                    method:'POST',
                    body
                });
            }
            const resultObject = await result.json();
            console.log('resultObject:', resultObject);
           
            dispatch(uiActions.setLoading(false));
            if(result.ok){
                const payload:PremioInterface = {
                    ...resultObject
                }
                
                dispatch(configurationActions.add_reward(payload));
                
            }else{
                dispatch(uiActions.showNotification({show:true, message:resultObject.name}));
            }
        }

        try{
            await saveRewardData();
        }catch(error:any){
            dispatch(uiActions.showNotification({show:true, message:error.message}));
        }
    }
}

export const loadRewardConfigurationData = (universityId:string|string[]):ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch) => {
        const loadRewardData = async() =>{
            // dispatch(uiActions.setLoading(true));
            const result = await fetch(`/api/configuration/${universityId}/reward/`);
            const resultObject = await result.json();
            
            if(!result.ok){
                dispatch(uiActions.showNotification(resultObject.message));
            }else{
                dispatch(configurationActions.load_rewards(resultObject));
            }
        }

        try{
            await loadRewardData();
        }catch(error:any){
            console.log('Ocurrió un error');
            dispatch(uiActions.showNotification({show:true, message:error.message}));
        }
    }
}

export const saveLandingSectionsData =
 (universityId:string|string[], landingSections:Array<SectionInterface>):ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch) =>{
        const saveLandingData= async() =>{
            const body = new FormData();
            for(let i=0; i < landingSections.length; i++){
                body.append(`title-${i}`, landingSections[i].title);
                body.append(`image-${i}`, landingSections[i].image);
                body.append(`description-${i}`, landingSections[i].description);

            }
            const result = await fetch(`/api/configuration/${universityId}/landing_sections`,{
                method:"POST",
                body
            });
            const resultObject = await result.json();
            
            if(!result.ok){
                dispatch(uiActions.showNotification(resultObject.message));
            }else{
                dispatch(configurationActions.load_landingSections(resultObject));
            }
        }
        try{
            saveLandingData();
        }catch(error:any){
            console.log('Ocurrió un error');
            dispatch(uiActions.showNotification({show:true, message:error.message}));
        }
    }
}

export const loadBenefits = 
(universitySigla:string):ThunkAction<void, RootState, unknown, AnyAction> =>{
    return async (dispatch) =>{
        const getBenefits = async() =>{
            if(universitySigla){
                const result = await fetch(`/api/configuration/${universitySigla}/benefits`);
                const data = await result.json();
                dispatch(configurationActions.load_benefits(data));
            }else{
                throw new Error('El parametro de la Universidad no puede estar vacio.');
            }   

        }
        try{
            await getBenefits();
        }catch(error:any){
            dispatch(uiActions.showNotification({show:true, message:`Hubo un error al acceder al servicio, intentelo en unos minutos`, color:"red"}));
            console.log('Ocurrio el siguiente error:', error.message);
        }
    }
}