import { AnyAction } from 'redux';
import {RootState} from './index';
import { ThunkAction } from 'redux-thunk';
import { authActions } from './auth-slice';
import { uiActions } from './ui-slice';

export const fetchAuthData = 
    (email:string): ThunkAction<void, RootState, unknown, AnyAction> => {
        
    return async (dispatch) => {
        const fetchData = async () =>{
            
            const result = await fetch('/api/authData');
            const data = await result.json();
            console.log("data:", data);
            if(!result.ok){
                dispatch(uiActions.showNotification({show:true, message:data.message, color:"red"}))
                
            }else{
                data.user.email = email;
                dispatch(authActions.login(data));
                
                
            }
            // dispatch(uiActions.setLoading(false));
            
        };
        try{
            await fetchData();
             
            
        }catch(error:any){
            dispatch(uiActions.showNotification({show:true, message:error.message, color:"red"}));
        }
        
    };
};