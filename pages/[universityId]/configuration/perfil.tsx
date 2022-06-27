import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { Fragment, useCallback, useEffect, useState } from "react";

import Button from "../../../components/UI/Button";
import Input from "../../../components/UI/Input";
import SeccionHeader from "../../../components/UI/SeccionHeader";
import classes from '../../../styles/Configuration/Perfil.module.css';
import spinnerClasses from '../../../styles/spinner.module.css';
import { uiActions } from "../../../store/ui-slice";
import { useAppDispatch } from "../../../hooks/store-hooks";
import useInput from "../../../hooks/use-input";
import { useRouter } from "next/router";
import {useSession} from "next-auth/react";

const Perfil = () =>{
    
    const {data:session, status} = useSession();
    const [universidad, setUniversidad] = useState("");
    const [email, setEmail] = useState("");
    const [rol, setRol] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(true);
    const router = useRouter();
    const {universityId} = router.query;
    
    const dispatch = useAppDispatch();
    

    //Validation function for Password field
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
        setValue:setPasswordValue,
        onChangeHandler:onChangePasswordHandler, 
        onBlurHandler:onBlurPasswordHandler,
        isInputInvalid: isInputPasswordInvalid,
        errorMessage:errorMessagePassword} = useInput(validatePassword);

    //Validation function for Password Confirmation field
    const validatePasswordConfirmation = useCallback((value:string) =>{
        const empty = value === '';
        const minSize = value.trim().length < 8 ? false : true;
        
        if(empty){
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

        if(password.length !== value.length){
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

    const {value:passwordConfirmation, 
        onChangeHandler:onChangePasswordConfirmationHandler, 
        onBlurHandler:onBlurPasswordConfirmationHandler,
        isInputInvalid: isInputPasswordConfirmationInvalid,
        valueIsValid:isPasswordConfirmationValid,
        errorMessage:errorMessagePasswordConfirmation} = useInput(validatePasswordConfirmation);
    
    const onSubmitHandler = async(e:React.FormEvent) =>{
        e.preventDefault();
        console.log("isInputPasswordInvalid:", !isInputPasswordInvalid);
        console.log("isInputPasswordConfirmationInvalid:", !isInputPasswordConfirmationInvalid);
        if(!isInputPasswordInvalid && !isInputPasswordConfirmationInvalid){
            console.log("Before fetch call");
            const result = await fetch(`/api/configuration/${universityId}/password`,{
                method:'PUT',
                body:JSON.stringify({email:email, password: password}),
                headers:{
                    'Content-Type':'application/json'
                }
            });
            const data:any = await result.json();
            if(!result.ok){
                dispatch(uiActions.showNotification({show:true, message:data.message, color:'red'}));
            }else{
                dispatch(uiActions.showNotification({show:true, message:data.message, color:'green'}));
            }
            
        }
    }
    
    useEffect(
        ()=>{
            const fetchProfile = async() =>{
                if(universityId){
                    const result = await fetch(`/api/configuration/${universityId}/profile`);
                    const data:any = await result.json();
                    console.log('data:', data);
                    if(!result.ok){
                        console.log('Error response:', data);
                        dispatch(uiActions.showNotification({show:true, message:data.message, color:'red'}));
                    }else{
                        setUniversidad(data.universityName);
                        setRol(data.rol);
                        setEmail(data.email);
                        
                        

                    }
                }
            }
            try{
                fetchProfile();
            }catch(error:any){
                console.log('Ocurrio un error:', error);
                dispatch(uiActions.showNotification({show:true, message:error.message, color:'red'}));
            }
        },[universityId, session, setPasswordValue]
    )

    const enableSaveButton = !isInputPasswordInvalid && !isInputPasswordConfirmationInvalid ;

    console.log('enableSaveButton:', enableSaveButton);
    if(status === 'authenticated'){    
        return(
            <Fragment>
                <SeccionHeader centerMarginTitle={true} titleText=""  />
                <form className={classes.formContainer} onSubmit={onSubmitHandler}>
                    <h3 className={classes.title}>Perfil</h3>
                    <Input label="Universidad"  value={universidad} additionalAttributes={{type:"text", autoComplete:"off", readOnly:true, width:""}} />
                    <Input label="Email" value={email} additionalAttributes={{type:"text", autoComplete:"off", readOnly:true}} />
                    <Input label="Rol" value={rol} additionalAttributes={{type:"text", autoComplete:"off", readOnly:true}} />
                    <h4 id="subTitle">Modificar mi clave</h4>
                    <div className={classes.passwordContainer}>
                                    <Input 
                                    id="passwordId" 
                                    label="Clave" 
                                    value={password} 
                                    onChangeHandler={onChangePasswordHandler}
                                    onBlurHandler={onBlurPasswordHandler}
                                    isInputInvalid={isInputPasswordInvalid}
                                    errorMessage={errorMessagePassword}
                                    additionalAttributes={{type:showPassword ? "password" : "text", autoComplete:"off"}}/>
                                    {showPassword && <i><FaEye  className={classes.eyeIcon} onClick={() => setShowPassword(!showPassword)}/></i>}
                                    {!showPassword && <i><FaEyeSlash className={classes.eyeIcon} onClick={() => setShowPassword(!showPassword)}/></i>}
                                
                    </div>
                    <div className={classes.passwordContainer}>
                                    <Input 
                                    id="passwordConfirmationId" 
                                    label="Confirmá tu clave" 
                                    value={passwordConfirmation} 
                                    onChangeHandler={onChangePasswordConfirmationHandler}
                                    onBlurHandler={onBlurPasswordConfirmationHandler}
                                    isInputInvalid={isInputPasswordConfirmationInvalid}
                                    errorMessage={errorMessagePasswordConfirmation}
                                    additionalAttributes={{type:showPasswordConfirmation ? "password" : "text", autoComplete:"off"}}/>
                                    {showPasswordConfirmation && <i><FaEye  className={classes.eyeIcon} onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}/></i>}
                                    {!showPasswordConfirmation && <i><FaEyeSlash className={classes.eyeIcon} onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}/></i>}
                                
                    </div>
                    
                    <div className={classes.saveButton}>
                                <Button
                                label="Guardar" 
                                additionalStyle={{backgroundColor:"var(--primary-color)", 
                                color:"var(--on-primary-text-color)", width:"100%", height:"49px", margin:"32px 0px 32px 0px"}}
                                isAvailable = {enableSaveButton}
                                
                                />
                    </div>



                </form>
            </Fragment>
        )
    }
    if(!universityId ||  status === 'loading'){
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

export default Perfil;


// export  const getServerSideProps = async ({query}) => {
//     const {universityId:univertitySiglaId} = query;
//     // console.log('universityId:', univertitySiglaId);
//     //  const url = `/api/configuration/${univertitySiglaId}/profile`;
//     const result = await fetch(`/api/configuration/${univertitySiglaId}/profile`);
//     console.log('result:', result);
//     const data = await result.json();
//     // const data ={
//     //     universityName:"Universidad del Cono Sur de las Americas",
//     //     rol:'admin',
//     //     email:'jorge@ucsa.edu.py'
//     // }
//     return{
//         props:data
//     }
// }