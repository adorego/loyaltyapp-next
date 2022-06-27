import { FaEye, FaEyeSlash, FaSlash } from "react-icons/fa";
import React, {Fragment, useCallback, useEffect, useState} from "react";

import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import Link from "next/link";
import LoginInterface from "../data/Login-interface";
import LoginResponseInterface from "../data/Login-response-interface";
import { authActions } from "../store/auth-slice";
import classes from "../styles/Login.module.css";
import classesSpinner from '../styles/spinner.module.css';
import { fetchAuthData } from "../store/auth-actions";
import {signIn} from "next-auth/react";
import { uiActions } from "../store/ui-slice";
import {useAppDispatch} from "../hooks/store-hooks";
import {useAppSelector} from "../hooks/store-hooks";
import useInput from "../hooks/use-input";
import {useRouter} from "next/router";
import { useSession } from "next-auth/react";

const Login = (props:LoginInterface) =>{
    const dispatch = useAppDispatch();
    const router = useRouter();
    const sigla = useAppSelector(state => state.auth.university.sigla);
    const isAppConfigured = useAppSelector(state => state.configuration.isConfigured);
    const {data:session, status} = useSession();
    const [showEye, setShowEye] = useState(true);
    
    
    
    useEffect(
        () =>{
            if(sigla.length > 0 && (status === 'authenticated')){
                if(isAppConfigured){
                    router.push(`${sigla}/reportes`)
                }else{
                    router.push(`${sigla}/configuration`)
                }
            }
        },[sigla, status, isAppConfigured, router]
    )
    

   
    const validateEmail = useCallback((value:string) =>{
        const empty = value.length === 0;
       
        if(empty){
            return{
                pass:false,
                errorMessage:"Este campo no puede estar vacio"
            }
        }
        return{
            pass:true,
            errorMessage:""}

    },[]);

    const {value:email, 
        onChangeHandler:onChangeEmailHandler, 
        onBlurHandler:onBlurEmailHandler,
        isInputInvalid: isInputEmailInvalid,
        valueIsValid: emailValueIsValid,
        onFocus:onFocusEmailHandler,
        errorMessage:errorMessageEmail} = useInput(validateEmail);

    const validatePassword = useCallback((value:string) =>{
        const empty = value.length === 0;
        const minSize = value.trim().length < 8 ? false : true;
        
        if(empty){
            return{
                pass:false,
                errorMessage:"Este campo no puede estar vacio"
            }
        }
        if(!minSize){
            return{
                pass:false,
                errorMessage:"Tu clave debe tener 8 caracteres como mínimo"
            }
        }
        return{
            pass:true,
            errorMessage:""
        }
    },[]);

    

    const {value:password, 
            onChangeHandler:onChangePasswordHandler, 
            onBlurHandler:onBlurPasswordHandler,
            isInputInvalid: isInputPasswordInvalid,
            errorMessage:errorMessagePassword} = useInput(validatePassword);

    const onSubmit = async (e:React.SyntheticEvent) =>{
                e.preventDefault();
                if(!isInputEmailInvalid && !isInputPasswordInvalid){
                    const result:any = await signIn('credentials', {
                        redirect: false,
                        email: email,
                        password: password
                    
                    })
                     
                     if(result.error){
                         
                        dispatch(uiActions.showNotification({show:true, message:"Hay un problema con el par usuario/clave", color:'red'}));
                     }else{
                        
                        const result = await fetch('/api/authData');
                        const data = await result.json();
                        console.log('data:', data);
                        if(!result.ok){
                            dispatch(uiActions.showNotification({show:true, message:"Hay un problema con en el proceso de authenticación", color:'red'}))
                        }else{
                            dispatch(authActions.login(data));
                        }
                
                        
                     }
                    
                    
                }
               
                
    }

    const onRegisterClickHandler = (e:React.MouseEvent<HTMLButtonElement>) =>{
        console.log("onRegisterClick");
        e.preventDefault();
        router.push(`/register`);
    }
    
    
    const enableSubmit = !isInputEmailInvalid && !isInputPasswordInvalid;
    
    if(status === 'unauthenticated'){   
        return (
            <Fragment>
                <form className={classes.form} autoComplete="off" onSubmit={onSubmit}>
                    <h3 className={classes.title}>Bienvenido!</h3>
                    
                    <Input 
                    id="emailId" 
                    label="Correo" 
                    value={email} 
                    onChangeHandler={onChangeEmailHandler}
                    onBlurHandler={onBlurEmailHandler}
                    isInputInvalid={isInputEmailInvalid}
                    errorMessage={errorMessageEmail}
                    additionalAttributes={{type:"email", autoComplete:"off"}}/>
                    <div className={classes.passwordContainer}>
                            <Input 
                            id="passwordId" 
                            label="Clave" 
                            value={password} 
                            onChangeHandler={onChangePasswordHandler}
                            onBlurHandler={onBlurPasswordHandler}
                            isInputInvalid={isInputPasswordInvalid}
                            errorMessage={errorMessagePassword}
                            additionalAttributes={{type:showEye ? "password" : "text", autoComplete:"off"}}/>
                            {showEye && <i><FaEye  className={classes.eyeIcon} onClick={() => setShowEye(!showEye)}/></i>}
                            {!showEye && <i><FaEyeSlash className={classes.eyeIcon} onClick={() => setShowEye(!showEye)}/></i>}
                        
                    </div>
                    
                    <div className={classes.recoverLink}>

                        <Link href="/recoverpassword">Olvide mi clave</Link>
                    </div>
                    
                    <div className={classes.submitButton}>
                        <Button 
                        isAvailable={enableSubmit}
                        label="Ingresar" 
                        additionalStyle={{backgroundColor:"var(--primary-color)", 
                        color:"var(--on-primary-text-color)", width:"100%", height:"49px"}}/>
                    </div>
                    
                    
                </form>
                <div className={classes["submitButton"] + ' ' + classes["registerButton"]}>
                        <Button 
                        isAvailable={true}
                        label="Registrarme" 
                        onClickHandler={onRegisterClickHandler}
                        additionalStyle={{backgroundColor:"var(--secondary-color)", color:"var(--on-primary-text-color)", width:"100%", height:"49px"}}/>
                </div>
                
        
                
            
            </Fragment>
        )
    }
    if(status === 'loading'){
        return(
            <div className={classesSpinner["lds-dual-ring"]}></div>
        )
    }
    if(status === 'authenticated'){
        if(!sigla || sigla.length === 0){
            if(session && session.user && session.user.email){
                dispatch(fetchAuthData(session.user?.email));
            }
        }else{
            if(isAppConfigured){
                router.push(`/${sigla}/reportes`)
            }else{
                router.push(`/${sigla}/configuration/`)
            }
        }
        return(
            <div className={classesSpinner["lds-dual-ring"]}></div>
        )
    }
    
}

export default Login;