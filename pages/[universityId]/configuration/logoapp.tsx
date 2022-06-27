import {useEffect, useState} from 'react';

import Button from "../../../components/UI/Button";
import ConfigurationInterface from "../../../data/Configuration-interface";
import { Fragment } from "react";
import ImageSelector from "../../../components/UI/ImageSelector";
import LogoAppInterface from '../../../data/Configuration/LogoApp-interface';
import SeccionHeader from '../../../components/UI/SeccionHeader';
import { UNIVERSITIES } from '../../../helpers/collectionNames';
import { authActions } from '../../../store/auth-slice';
import classes from "../../../styles/configuration/LogoApp.module.css";
import classesSpinner from '../../../styles/spinner.module.css';
import connect from '../../../dataBase/dataBase';
import { uiActions } from '../../../store/ui-slice';
import { useAppDispatch } from '../../../hooks/store-hooks';
import {useRouter} from 'next/router';
import {useSession} from 'next-auth/react';

const Configuration = (props:LogoAppInterface) => {
    const {data:session, status} = useSession();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {universityId} = router.query;



    const loadLogo = (file:Blob, newLoaded:boolean) =>{
        // console.log("loadLogo:", file);
        // setLogo(file);
        newLoaded ? sendLogo(file) : '';
    }

    

    const sendLogo = async (file:Blob) =>{
        console.log("Sending logo!", file);
        
        const body =new FormData();
        body.append("file", file);
        // console.log("FormData:", body);
        const result = await fetch(`/api/configuration/${universityId}/logo_upload`,{
            method: 'POST',
            body
        });
        const data = await result.json(); 
        if(result.ok){
            dispatch(uiActions.showNotification({show:true, message:"Actualización exitosa", color:"green"}));
            dispatch(authActions.load_logo({logo:data.logo, frontEndCompletePath:data.frontEndCompletePath}));
            
        }else{
            console.log('data:', data);
            dispatch(uiActions.showNotification({show:true, message: data.message, color:"red"}));
        }
    }
    if(status === 'loading'){
        return <div className={classesSpinner['lds-dual-ring']}></div>
    }
    
    if(status === 'authenticated'){
       
        return(
            <Fragment>
                <SeccionHeader centerMarginTitle={false} titleText={''} 
                    subTitleText={''}  explanationText={''}/>  
                <div className={classes.container}>
                    <h3 className={classes.title}>Logo</h3>   
                    <h6>Sube el logo de tu Institución</h6>     
                    <ImageSelector imageLoaded={loadLogo} image={props.logo ? props.logo : ''} />
                </div>
                        
                
                
            </Fragment>
            
        )   
    }

    if(status === 'unauthenticated'){
        router.push('/login');
        return <div className={classesSpinner['lds-dual-ring']}></div>
        
    }
}

export default Configuration;


export async function getServerSideProps({query}){
    const {universityId:universitySiglaId} = query;

    const dbClient = await connect();
    try{
        if(dbClient){
            const db = dbClient?.db();
            const universityCollection = db.collection(UNIVERSITIES);
            const university = await universityCollection.findOne({sigla:universitySiglaId});
            // console.log('university:', university);
            return{
                props:{
                    logo:university && university.frontEndCompletePath ? university.frontEndCompletePath : ''
                }
            }
        }   
    }
    catch(error:any){
        console.log('Hubo un error.');
    }
    finally{
        dbClient?.close();
    }
}