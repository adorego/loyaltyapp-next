import {useEffect, useState} from 'react';

import Button from "../../../components/UI/Button";
import ConfigurationInterface from "../../../data/Configuration-interface";
import { Fragment } from "react";
import ImageSelector from "../../../components/UI/ImageSelector";
import SeccionHeader from '../../../components/UI/SeccionHeader';
import { authActions } from '../../../store/auth-slice';
import classes from "../../../styles/Configuration.module.css";
import classesSpinner from '../../../styles/spinner.module.css';
import { fetchAuthData } from '../../../store/auth-actions';
import {getSession} from 'next-auth/client';
import { uiActions } from '../../../store/ui-slice';
import { useAppDispatch } from '../../../hooks/store-hooks';
import { useAppSelector } from '../../../hooks/store-hooks';
import {useRouter} from 'next/router';

const Configuration = (props:ConfigurationInterface) => {
    const [logoLoaded, setLogoLoaded] = useState(false);
    const [logo, setLogo] = useState<Blob>();
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const configuredImage = useAppSelector(state => state.auth.university.frontEndCompletePath);
    const isLogged = useAppSelector(state => state.auth.isLogged);
    const {universityId} = router.query;

    useEffect(
        () =>{
            getSession().then(
                (session) => {
                    if(session){
                        if(!isLogged){
                            setLoading(true);
                            session && session.user && session.user.email ? dispatch(fetchAuthData(session.user?.email)): '';
                        }
                        setLoading(false);
                        
                    }else{
                        // setLoading(true);
                        window.location.href = '/login';
                    }
                }
            )
        },[dispatch])
    useEffect(
        () =>{
            if(configuredImage || logo){
                setLogoLoaded(true);
            }

    },[configuredImage, logo])
    
    if(loading){
        return <div className={classesSpinner['lds-dual-ring']}></div>
    }

    const loadLogo = (file:Blob) =>{
        // console.log("loadLogo:", file);
        setLogo(file);
        sendLogo(file);
    }

    const onSiguienteHandler = (e:React.MouseEvent<HTMLButtonElement>) =>{
        router.push(`/${universityId}/configuration/colorapp`);
    }

    const sendLogo = async (file:Blob) =>{
        // console.log("Sending logo!", file);
        
        const body =new FormData();
        body.append("file", file);
        // console.log("FormData:", body);
        const result = await fetch(`/api/configuration/${universityId}/logo_upload`,{
            method: 'POST',
            body
        });
        const resultObject = await result.json(); 
        if(result.ok){
            setLogoLoaded(true);
            console.log('resultObject from logo_upload:', resultObject);
             dispatch(authActions.load_logo({frontEndCompletePath:resultObject.frontEndCompletePath}));
            
        }else{
            
            dispatch(uiActions.showNotification({show:true, message: resultObject.name}));
        }
    }
        
    return(
         <Fragment>
            {isLogged && <div>   
                 <SeccionHeader titleText={'Configuración'} number={1} subTitleText={'Logo'}  explanationText={'Sube el logo de tu Institución'}/>  
                    
                    <ImageSelector imageLoaded={loadLogo} image={configuredImage} />
                    <div className={classes.siguienteBox}>
                        <Button 
                            onClickHandler={onSiguienteHandler}
                            disabled={!logoLoaded}
                            label="Siguiente" 
                            classOfButton="borderButton" 
                            additionalStyle={{backgroundColor:"#B11016", width:"50%"}} />
                    </div>
            
            </div>}
        </Fragment>
        
    )   
}

export default Configuration;