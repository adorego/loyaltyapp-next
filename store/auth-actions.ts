import { AnyAction } from 'redux';
import {RootState} from './index';
import { ThunkAction } from 'redux-thunk';
import { authActions } from './auth-slice';
import { uiActions } from './ui-slice';

export const fetchAuthData = 
    (email:string): ThunkAction<void, RootState, unknown, AnyAction> => {
        
    return async (dispatch) => {
        const fetchData = async () =>{
            dispatch(uiActions.setLoading(true));
            const result = await fetch('/api/auth/authData');
            const resultObject = await result.json();
            if(!result.ok){
                dispatch(uiActions.showNotification({show:true, message:resultObject.name}));
                
            }else{
                resultObject.user.email = email;
                console.log('Data before dispatching:', resultObject);
                dispatch(authActions.login(resultObject));
                
                
            }
            
        };
        try{
            fetchData();
             
            
        }catch(error:any){
            dispatch(uiActions.showNotification({show:true, message:error.message}));
        }
        
    };
};