import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { Fragment, useCallback, useState } from "react";

import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import Notification from "../components/Layout/Notification";
import { RegisterInterface } from "../data/Register-interface";
import { authActions } from "../store/auth-slice";
import classes from "../styles/Register.module.css";
import classesSpinner from "../styles/spinner.module.css";
import { uiActions } from "../store/ui-slice";
import { useAppDispatch } from "../hooks/store-hooks";
import useInput from "../hooks/use-input";
import {useRouter} from "next/router";

const Register = (props:RegisterInterface) => {
    const [showSpinner, setShowSpinner] = useState(false);
    const [showEye, setShowEye] = useState(true);
    const [showEyeRecovery, setShowEyeRecovery] = useState(true);
    const dispatch = useAppDispatch();
    const router = useRouter();



    const validateName = useCallback((value:string)=> {
        if(value.trim() !== ''){
            return {pass:true, errorMessage: ""};
        }
        return {pass:false, errorMessage:"Este campo no debe estar vacio"};
    },[]);

    const {value:universityName, 
        onChangeHandler: onChangeUniversityNameHandler, 
        onBlurHandler: onBlurUniversityNameHandler,
        isInputInvalid: isInputUniversityNameInvalid,
        onFocus: onFocusUniversityName,
        errorMessage:errorMessageUniversityName} = useInput(validateName,"Ej. Universidad Stanford");

   
        const validateSigla = useCallback((value:string)=> {
            if(value.trim() !== ''){
                return {pass:true, errorMessage: ""};
            }
            return {pass:false, errorMessage:"Este campo no debe estar vacio"};
    },[]);
    
    
    const {value:sigla, 
        onChangeHandler: onChangeSiglaHandler, 
        onBlurHandler: onBlurSiglaHandler,
        isInputInvalid: isInputSiglaInvalid,
        onFocus: onFocusSigla,
        errorMessage:errorMessageSigla} = useInput(validateSigla,"Ej. una, uca, ucsa");
    
    
    
    const validateEmail = useCallback((value:string) =>{
        const result = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/.test(value);
        return{pass:result, errorMessage:'Email invalido'}

    },[]);

    const {value:email, 
        onChangeHandler:onChangeEmailHandler, 
        onBlurHandler:onBlurEmailHandler,
        isInputInvalid: isInputEmailInvalid,
        errorMessage:errorMessageEmail} = useInput(validateEmail);

    const validatePassword = useCallback((value:string) =>{
        const empty = value !== '';
        const minSize = value.trim().length < 8 ? false : true;
        
        if(!empty){
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

    const validateConfirmPassword = useCallback((value:string) =>{
        const empty = value !== '';
        const minSize = value.trim().length < 8 ? false : true;
        
        if(!empty){
            return{
                pass:false,
                errorMessage:"Este campo no puede estar vacio"
            }
        }
        //console.log("validateConfirmPassword:",value.trim(), password.trim().slice(0, value.length));
        if(value.trim() !== password.trim().slice(0,value.length) ){
            return{
                pass:false,
                errorMessage:"La confirmación debe coincidir con la clave"
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
    },[password]);

    
    const {value:repeatedPassword, 
                    onChangeHandler:onChangeRepeatedPasswordHandler, 
                    onBlurHandler:onBlurRepeatedPasswordHandler,
                    isInputInvalid: isInputRepeatedPasswordInvalid,
                    errorMessage:errorMessageRepeatedPassword} = useInput(validateConfirmPassword);

 
    
    const onSubmit = async (e:React.SyntheticEvent) =>{
        e.preventDefault();
        if(!isInputUniversityNameInvalid && !isInputEmailInvalid && !isInputPasswordInvalid && !isInputRepeatedPasswordInvalid && !isInputSiglaInvalid){
            //Submit object to backend
            const dataToSend = {universityName, sigla, email, password};
            
            setShowSpinner(true);
            const response = await fetch('/api/auth/register',{
                method:'POST',
                body:JSON.stringify(dataToSend),
                headers:{
                    'Content-Type':'applications/json'
                }
            });


            const dataResponse = await response.json();
           
            
            if(response.ok){
                dispatch(authActions.register({...dataResponse.data}));
                router.push(`/${dataResponse.data.university.sigla}/confirm_email`);
                
            }else{
                dispatch(uiActions.showNotification({show:true, message:`Ocurrió un error durante el registro:${dataResponse.name}`, color:"red"}))
            }
            setShowSpinner(false);
        }
        
    }
    
    
    
    return(
        <Fragment>
            {showSpinner && <div className={classesSpinner['lds-dual-ring']}></div>}
            {!showSpinner && <form className={classes.form} autoComplete="off" onSubmit={onSubmit}>
                    <h3 className={classes.title}>Bienvenido, registrá tu Universidad!</h3>
                    <Input id="universidadId" 
                    label="Nombre de la Universidad" 
                    value={universityName} 
                    onChangeHandler={onChangeUniversityNameHandler}
                    onBlurHandler={onBlurUniversityNameHandler}
                    onFocusHandler={onFocusUniversityName}
                    isInputInvalid={isInputUniversityNameInvalid}
                    errorMessage={errorMessageUniversityName}
                    additionalAttributes={{type:"text", autoComplete:"off"}}/>
                    
                    <Input id="siglasId" 
                    label="Siglas de la Universidad" 
                    value={sigla} 
                    onChangeHandler={onChangeSiglaHandler}
                    onBlurHandler={onBlurSiglaHandler}
                    onFocusHandler={onFocusSigla}
                    isInputInvalid={isInputSiglaInvalid}
                    errorMessage={errorMessageSigla}
                    additionalAttributes={{type:"text", autoComplete:"off", margin:"16px 0px 0px 0px"}}/>
                    
                    <Input id="emailId" 
                    label="Correo" 
                    value={email} 
                    onChangeHandler={onChangeEmailHandler}
                    onBlurHandler={onBlurEmailHandler}
                    isInputInvalid={isInputEmailInvalid}
                    errorMessage={errorMessageEmail}
                    additionalAttributes={{type:"email", autoComplete:"off"}}/>
                   
                   <div className={classes.passwordContainer}>
                        <Input id="passwordId" 
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
                    
                    <div className={classes.confirmPasswordContainer}>
                        <Input id="confirmId" 
                        label="Confirmar clave" 
                        value={repeatedPassword} 
                        onChangeHandler={onChangeRepeatedPasswordHandler}
                        onBlurHandler={onBlurRepeatedPasswordHandler}
                        isInputInvalid={isInputRepeatedPasswordInvalid}
                        errorMessage={errorMessageRepeatedPassword}
                        additionalAttributes={{type:showEyeRecovery ? "password" : "text", autoComplete:"off"}}/>
                        {showEyeRecovery && <i><FaEye  className={classes.eyeIcon} onClick={() => setShowEyeRecovery(!showEyeRecovery)}/></i>}
                        {!showEyeRecovery && <i><FaEyeSlash className={classes.eyeIcon} onClick={() => setShowEyeRecovery(!showEyeRecovery)}/></i>}
                    </div>
                    <div className={classes.submitButton}>
                        <Button label="Registrarme" isAvailable={true} 
                        
                        additionalStyle={{backgroundColor:"var(--primary-color)",
                        color:"var(--on-primary-text-color)", width:"100%",
                        margin:"16px 0px 32px 0px"}}
                         />
                    </div>
                    </form>
            }
        </Fragment>
    )
}

export default Register;