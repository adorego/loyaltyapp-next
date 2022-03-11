import {Fragment, useCallback} from "react";

import Button from "../UI/Button";
import Input from "../UI/Input";
import Link from "next/link";
import LoginInterface from "../../data/Login-interface";
import classes from "./Login.module.css";
import useInput from "../../hooks/use-input";

const Login = (props:LoginInterface) =>{
    
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

    const onSubmit = (e:React.SyntheticEvent) =>{
                e.preventDefault();
                if(!isInputEmailInvalid && !isInputPasswordInvalid){
                    //Submit object to backend
                    
                }
                
            }
    return (
        <Fragment>
            <form className={classes.form} autoComplete="off" onSubmit={onSubmit}>
                <h1 className={classes.title}>Bienvenido!</h1>
                <h4 className={classes.title}>Ingresá tu correo y clave</h4>

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
                <div className={classes.submitButton}>
                    <Button classOfButton="borderButton" 
                    label="Ingresar" 
                    additionalStyle={{color:"black",paddingLeft:"2rem", paddingRight:"2rem", width:"auto"}} />
                </div>
            </form>
            <Link href="/recoverpassword">Olvidé mi clave</Link>
            
           
        </Fragment>
    )
}

export default Login;