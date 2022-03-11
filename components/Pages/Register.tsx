import React, { Fragment, useCallback } from "react";

import Button from "../UI/Button";
import Input from "../UI/Input";
import { RegisterInterface } from "../../data/Register-interface";
import classes from "./Register.module.css";
import useInput from "../../hooks/use-input";

const Register = (props:RegisterInterface) => {
    const validateName = useCallback((value:string)=> {
        if(value.trim() !== ''){
            return {pass:true, errorMessage: ""};
        }
        return {pass:false, errorMessage:"Este campo no debe estar vacio"};
    },[]);

    const validateEmail = useCallback((value:string) =>{
        const result = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value);
        return{pass:result, errorMessage:'Email invalido'}

    },[]);

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

    
    const {value:universityName, 
        onChangeHandler: onChangeUniversityNameHandler, 
        onBlurHandler: onBlurUniversityNameHandler,
        isInputInvalid: isInputUniversityNameInvalid,
        errorMessage:errorMessageUniversityName} = useInput(validateName);

    const {value:email, 
            onChangeHandler:onChangeEmailHandler, 
            onBlurHandler:onBlurEmailHandler,
            isInputInvalid: isInputEmailInvalid,
            errorMessage:errorMessageEmail} = useInput(validateEmail);
    const {value:password, 
                onChangeHandler:onChangePasswordHandler, 
                onBlurHandler:onBlurPasswordHandler,
                isInputInvalid: isInputPasswordInvalid,
                errorMessage:errorMessagePassword} = useInput(validatePassword);
    const {value:repeatedPassword, 
                    onChangeHandler:onChangeRepeatedPasswordHandler, 
                    onBlurHandler:onBlurRepeatedPasswordHandler,
                    isInputInvalid: isInputRepeatedPasswordInvalid,
                    errorMessage:errorMessageRepeatedPassword} = useInput(validateName);
 
    const onSubmit = (e:React.SyntheticEvent) =>{
        e.preventDefault();
        if(!isInputUniversityNameInvalid && !isInputEmailInvalid && !isInputPasswordInvalid && !isInputRepeatedPasswordInvalid){
            //Submit object to backend
            
        }
        
    }
    
    
    
    return(
        <Fragment>
            <form className={classes.form} autoComplete="off">
                <h3 className={classes.title}>Bienvenido, registrá tu Universidad!</h3>
                <Input id="universidadId" 
                label="Nombre de la Universidad" 
                value={universityName} 
                onChangeHandler={onChangeUniversityNameHandler}
                onBlurHandler={onBlurUniversityNameHandler}
                isInputInvalid={isInputUniversityNameInvalid}
                errorMessage={errorMessageUniversityName}
                additionalAttributes={{type:"text", autoComplete:"off"}}/>
                <Input id="emailId" 
                label="Correo" 
                value={email} 
                onChangeHandler={onChangeEmailHandler}
                onBlurHandler={onBlurEmailHandler}
                isInputInvalid={isInputEmailInvalid}
                errorMessage={errorMessageEmail}
                additionalAttributes={{type:"email", autoComplete:"off"}}/>
                <Input id="passwordId" 
                label="Clave" 
                value={password} 
                onChangeHandler={onChangePasswordHandler}
                onBlurHandler={onBlurPasswordHandler}
                isInputInvalid={isInputPasswordInvalid}
                errorMessage={errorMessagePassword}
                additionalAttributes={{type:"password", autoComplete:"off"}}/>
                <Input id="confirmId" 
                label="Confirmar clave" 
                value={repeatedPassword} 
                onChangeHandler={onChangeRepeatedPasswordHandler}
                onBlurHandler={onBlurRepeatedPasswordHandler}
                isInputInvalid={isInputRepeatedPasswordInvalid}
                errorMessage={errorMessageRepeatedPassword}
                additionalAttributes={{type:"password", autoComplete:"off"}}/>
                <div className={classes.submitButton}>
                    <Button classOfButton="borderButton" label="Registrarme" additionalStyle={{color:"black"}} />
                </div>
            </form>
        </Fragment>
    )
}

export default Register;