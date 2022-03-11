import {Fragment, useCallback, useEffect, useState} from "react";

import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import Link from "next/link";
import LoginInterface from "../data/Login-interface";
// import Notification from "../components/Layout/Notification";
import classes from "../styles/Login.module.css";
import classesSpinner from '../styles/spinner.module.css';
import { fetchAuthData } from "../store/auth-actions";
import {signIn} from "next-auth/client";
import { uiActions } from "../store/ui-slice";
import {useAppDispatch} from "../hooks/store-hooks";
import {useAppSelector} from "../hooks/store-hooks";
import useInput from "../hooks/use-input";
import {useRouter} from "next/router";

const Login = (props:LoginInterface) =>{
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    
    
    const sigla = useAppSelector(state => state.auth.university.sigla);
    
    
    
    useEffect(() =>{
        if(sigla !== ''){
             router.push(`/${sigla}/configuration`);
        }
        
    },[sigla, router]);

   
    const validateEmail = useCallback((value:string) =>{
        //const result = /^w+[+.w-]*@([w-]+.)*w+[w-]*.([a-z]{2,4}|d+)$/i.test(value);
        const empty = value !== '';
       
        if(!empty){
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

    const onSubmit = async (e:React.SyntheticEvent) =>{
                e.preventDefault();
                if(!isInputEmailInvalid && !isInputPasswordInvalid){
                    setLoading(true);
                    const result = await signIn('credentials', {
                        redirect: false,
                        email: email,
                        password: password
                    
                    })
                    // console.log("Login result:", result);
                    if(!result?.error){
                        // console.log("Ingreso a fetchAuthData:");   
                        dispatch(fetchAuthData(email));
                        
                    }else{
                         let message;
                         if(result.error === 'NOT_FOUND_ERROR'){
                             message = 'No existe el usuario, por favor cree una cuenta'
                         }
                         dispatch(uiActions.showNotification({show:true, message:message}))
                    }

                    setLoading(false);
                    
                }
               
                
            }
            
    return (
        <Fragment>
            {/* {notification.show && <Notification message={notification.message} />} */}
            {loading && <div className={classesSpinner['lds-dual-ring']}></div>}
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
            <div className={classes.recoverLink}>

                <Link href="/recoverpassword">Olvide mi clave</Link>
            </div>
            
           
        </Fragment>
    )
}

export default Login;