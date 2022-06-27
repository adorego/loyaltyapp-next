import React, {Fragment, ReactText, useRef} from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";

import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import {authActions} from "../../store/auth-slice";
import classes from "../../styles/emailConfirmation.module.css";
import {useRouter} from "next/router";

const EmailConfirmation = () =>{
    const verification_code = useAppSelector(state => (state.auth.user.verification_code));
    const dispatch = useAppDispatch();
    const inputValue = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const onValidate = (event:React.ChangeEvent<HTMLButtonElement>) =>{
        if(inputValue && inputValue.current){
             const currentValue = inputValue.current.value;
             if(currentValue === verification_code){
                dispatch(authActions.validate_email());
                router.push('/login');
            }
        }
       
    }
    return(
        <div className={classes.box}>

            <p>Por favor ingresá el código que te hemos enviado por correo</p>
            <Input label="" ref={inputValue}  />
            <Button onClickHandler={onValidate}  
            isAvailable={true} 
            label="Confirmar" 
            additionalStyle={{color:"var(--on-primary-text-color)", 
            backgroundColor:"var(--primary-color)",
            margin:"16px 0px 0px 0px", width:"320px"}}/>
        </div>
    )
}

export default EmailConfirmation;