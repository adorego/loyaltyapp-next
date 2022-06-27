import { CONFIGURATION, UNIVERSITIES } from "../../../helpers/collectionNames";
import React, { Fragment, useEffect } from "react";

import Button from "../../../components/UI/Button";
import { FaBars } from "react-icons/fa";
import Image from "next/Image";
import SeccionHeader from "../../../components/UI/SeccionHeader";
import { authActions } from "../../../store/auth-slice";
import classes from '../../../styles/ColorApp.module.css';
import connect from "../../../dataBase/dataBase";
import { fetchAuthData } from "../../../store/auth-actions";
import spinnerClasses from '../../../styles/spinner.module.css';
import { uiActions } from "../../../store/ui-slice";
import { useAppDispatch } from "../../../hooks/store-hooks";
import { useAppSelector } from "../../../hooks/store-hooks";
import {useRouter} from 'next/router';
import {useSession} from 'next-auth/react';
import {useState} from 'react';

export interface ColorAppInterface{
    logo:string;
    logo_width:string,
    logo_height:string,
    headerColor:string;
    textHeaderColor:string;
}
const ColorApp = (props:ColorAppInterface) =>{
    const [color, setColor] = useState<string>(props.headerColor);
    const [textColor, setTextColor] = useState<string>(props.textHeaderColor);
    const {data:session, status} = useSession();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const universitySiglaId = useAppSelector(state => state.auth.university.sigla);
    
    
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{ 
        console.log("Color to set:", e.target.value);
        setColor(e.target.value);
    }
    const onTextColorChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setTextColor(e.target.value);
    }

    const style = {
        backgroundColor:color
        
    }

    const hamburguerStyle ={
        color:textColor
    }

    useEffect(
        () =>{
            if(status === 'authenticated' && !universitySiglaId){
                if(session && session.user && session.user.email)
                    dispatch(fetchAuthData(session.user.email));
            }
        },[status, universitySiglaId, dispatch, session]
    )

    const onSubmitHandler = async (e:React.FormEvent) =>{
        
        e.preventDefault();
        
        if(color && textColor){
            const body = {
                headerColor:color,
                textHeaderColor: textColor
            }
            console.log("body:", body, "universitySiglaId:", universitySiglaId);
            const result = await fetch(`/api/configuration/${universitySiglaId}/colorapp`,{
                method:'PUT',
                body:JSON.stringify(body),
                headers:{
                    'Content-Type':'application/json'
                } 
            });
            const data:any = await result.json();
            if(!result.ok){
                // console.log('Result:', result);
                dispatch(uiActions.showNotification({show:true, message:data.message, color:'red'}))     
            }else{
                dispatch(uiActions.showNotification({show:true, message:data.message, color:'green'}));    
            }
        }
    }
    
    if(status === 'authenticated'){
        console.log("Logo:", props.logo, props.logo_width, props.logo_height);
        return(
            <Fragment>
                <SeccionHeader centerMarginTitle={false} titleText={''} subTitleText={''}  explanationText={''} /> 
                <form className={classes.Form} onSubmit={onSubmitHandler}>
                    <h3>Color de tu marca</h3>
                    <div className={classes.HeaderArea} style={style}>
                        {props.logo && 
                        <div className={classes.logoContainer}>
                            <Image 
                            src={props.logo} 
                            alt='Logo of LoyaltyAPP' 
                            width={props.logo_width ? props.logo_width : 100}
                            height={props.logo_height ? props.logo_height : 60}
                            priority={true}
                            layout='responsive' />
                        </div>}
                        <FaBars className={classes.HamburguerHeader} style={hamburguerStyle} />
                    </div>
                
                    <div className={classes.formControl}>
                        <label className={classes.colorPrimaryLabel} htmlFor="mainColor">Color de la cabecera: </label>
                        <input className={classes.colorInput} id="mainColor" type="color" value={color} onChange={handleChange}/>
                    </div>
                    <div className={classes.formControl}>
                        <label className={classes.colorSecondaryLabel} htmlFor="secondaryColor">Color del texto: </label>
                        <input className={classes.colorInput} id="secondaryColor" type="color" value={textColor} onChange={onTextColorChangeHandler} />
                    </div>
                    <div className={classes.saveButton}>
                                <Button
                                label="Guardar" 
                                additionalStyle={{backgroundColor:"var(--primary-color)", 
                                color:"var(--on-primary-text-color)", width:"100%", height:"49px", margin:"32px 0px 32px 0px"}}
                                isAvailable = {true}
                                
                                />
                    </div>
                </form>
                    
                
            

            
    
            </Fragment>
        )
    }
    if(status === 'loading' || !universitySiglaId){
        return(
            <div className={spinnerClasses["lds-dual-ring "]}></div>
        )
    }
    if(status === 'unauthenticated'){
        router.push('/login');
        return(
            <div className={spinnerClasses["lds-dual-ring "]}></div>
        )
    }
}

export default ColorApp;


export async function getServerSideProps({query}){
    const {universityId:universitySiglaId} = query;

    const dbClient = await connect();
    try{
        if(dbClient){
            const db = dbClient?.db();
            const universityCollection = db.collection(UNIVERSITIES);
            const configurationCollection = db.collection(CONFIGURATION);
            const university = await universityCollection.findOne({sigla:universitySiglaId});
            const configuration = await configurationCollection.findOne({university_id:university?._id});
            // console.log('university:', university);
            return{
                props:{
                    logo:university && university.frontEndCompletePath ? university.frontEndCompletePath : '',
                    logo_width:university && university.logo_width ? university.logo_width : 100 ,
                    logo_height:university && university.logo_height ? university.logo_height : 80,
                    headerColor: configuration && configuration.headerColor ? configuration.headerColor : '',
                    textHeaderColor : configuration && configuration.textHeaderColor ? configuration.textHeaderColor : ''

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