import React, {Fragment, useState} from "react";

import BenefitFormInterface from "../../../data/Configuration/BenefitForm-interface";
import Button from "../Button";
import ImageSelector from "../ImageSelector";
import Input from "../Input";
import TextArea from "../TextArea";
import classes from './BenefitForm.module.css';
import classesSpinner from '../../../styles/spinner.module.css';
import {isNumber} from '../../../helpers/numberTestHelper';
import { uiActions } from "../../../store/ui-slice";
import { useAppDispatch } from "../../../hooks/store-hooks";
import useHttp from '../../../hooks/use-http';
import useInput from "../../../hooks/use-input";
import {useRouter} from 'next/router';

const BenefitForm = (props:BenefitFormInterface) => {
    const [benefitImage, setBenefitImage] = useState<Blob>();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {loading, error, sendPostWithFile} = useHttp();
    //Benefit image
    const imageLoaded = (image:Blob) =>{
        // console.log("Received Blob:", image);
        setBenefitImage(image);
    }

    //Benefit title
    const validateBenefitTitle = (value:string) =>{
        const empty = value === '';

        if(empty){
            return{
                pass:false,
                errorMessage:'Este valor no puede estar vacio'
            }
        }else{
            return{
                pass: true,
                errorMessage:''
            }
        }
    }
    const {value:benefitTitle, 
        onChangeHandler:onChangeBenefitHandler, 
        onBlurHandler:onBlurBenefitTitleHandler,
        isInputInvalid: isInputBenefitTitleInvalid,
        errorMessage:errorMessageBenefitTitle,
        onFocus:onFocusBenefitTitle} = useInput(validateBenefitTitle, 'Ej. 100% matricula exonerada');

    const validateBenefitDescription = (value:string) =>{
        const empty = value === '';

        if(empty){
            return{
                pass:false,
                errorMessage:'Este valor no puede estar vacio'
            }
        }else{
            return{
                pass: true,
                errorMessage:''
            }
        }
    }

    //Benefit description
    const {value:benefitDescription, 
        onChangeHandler:onChangeBenefitDescriptionHandler, 
        onBlurHandler:onBlurBenefitDescriptionHandler,
        isInputInvalid: isInputBenefitDescriptionInvalid,
        errorMessage:errorMessageBenefitDescription,
        onFocus:onFocusBenefitDescription} = useInput(validateBenefitDescription, `Ej. Con este beneficio podés comenzar la carrera y pagas tu primera cuota recien al siguiente mes`);

    //Term (plazo)
    const validateTerm = (value:string) =>{
        const empty = value === '';

        if(empty){
            return{
                pass:false,
                errorMessage:'Este valor no puede estar vacio'
            }
        }

        if(!isNumber(value)){
            return{
                pass:false,
                errorMessage:'Este valor debe ser numérico'
            }
        }
        
            
        return{
            pass: true,
            errorMessage:''
        }
        
    }
    const {value:benefitTerm, 
        onChangeHandler:onChangeBenefitTermHandler, 
        onBlurHandler:onBlurBenefitTermHandler,
        isInputInvalid: isInputBenefitTermInvalid,
        errorMessage:errorMessageBenefitTerm,
        onFocus:onFocusBenefitTerm} = useInput(validateTerm, 'Ej. 72');

    //Places (plazas)
    const validatePlaces = (value:string) =>{
        const empty = value === '';

        if(empty){
            return{
                pass:false,
                errorMessage:'Este valor no puede estar vacio'
            }
        }
        if(!isNumber(value)){
            return{
                pass:false,
                errorMessage:'Este valor debe ser numérico'
            }
        }
        
            
        return{
            pass: true,
            errorMessage:''
        }
    }
    const {value:benefitPlaces, 
        onChangeHandler:onChangeBenefitPlacesHandler, 
        onBlurHandler:onBlurBenefitPlacesHandler,
        isInputInvalid: isInputBenefitPlacesInvalid,
        errorMessage:errorMessageBenefitPlaces,
        onFocus:onFocusBenefitPlaces} = useInput(validatePlaces, 'Ej. 50');

    //End of Form 1

    const onSubmitHandler = async (e:React.FormEvent) =>{
        e.preventDefault();
        const {universityId} = router.query;
        // console.log('Submitting form...', universityId);
        if(benefitImage && !isInputBenefitTitleInvalid && !isInputBenefitDescriptionInvalid && !isInputBenefitTermInvalid && !isInputBenefitTermInvalid){
            // console.log('Preparing FormData');
            const body = new FormData();
            body.append("image", benefitImage);
            body.append("benefitTitle", benefitTitle);
            body.append("benefitDescription", benefitDescription);
            body.append("benefitTerm", benefitTerm);
            body.append("benefitPlaces", benefitPlaces);

            // const result = await fetch(`/api/configuration/${universityId}/create_benefit`,{
            //     method:'POST',
            //     body
            // });
            // const resultObject = await result.json();
            const result = await sendPostWithFile(`/api/configuration/${universityId}/benefits`, body);
            // console.log('Result', result);
            if(result){ 
                props.sentDataCorrectly();
            }else{
                dispatch(uiActions.showNotification({show:true, message:error.message}));
            }
        }else{
            dispatch(uiActions.showNotification({show:true, message:'No se pudieron enviar los datos, los datos no estan completos.'}))
        }
    }
    
    return(
        
        <Fragment>
                {loading && <div className={classesSpinner['lds-dual-ring']}></div>}
                <form className={classes.form} autoComplete="off">
                    <h3 className={classes.title}>Crea un beneficio digital!</h3>
                    <ImageSelector imageLoaded={imageLoaded}  label="Imagen del beneficio"/>

                    <Input 
                    id="benefitTitleId"
                    label="Titulo" 
                    value={benefitTitle} 
                    onChangeHandler={onChangeBenefitHandler}
                    onBlurHandler={onBlurBenefitTitleHandler}
                    onFocusHandler={onFocusBenefitTitle}
                    isInputInvalid={isInputBenefitTitleInvalid}
                    errorMessage={errorMessageBenefitTitle}
                    additionalAttributes={{type:"text", autoComplete:"off"}}/>

                    
                    <TextArea 
                    label="Descripción"
                    value={benefitDescription}
                    onChangeHandler={onChangeBenefitDescriptionHandler}
                    onBlurHandler={onBlurBenefitDescriptionHandler}
                    onFocusHandler={onFocusBenefitDescription}
                    isInputInvalid={isInputBenefitDescriptionInvalid}
                    errorMessage={errorMessageBenefitDescription}
                    rows={5}
                    cols={20}
                     />

                    

                    <Input 
                    id="benefitTermId"
                    label="Validez del beneficio después de recibido (en horas)" 
                    value={benefitTerm} 
                    onChangeHandler={onChangeBenefitTermHandler}
                    onBlurHandler={onBlurBenefitTermHandler}
                    onFocusHandler={onFocusBenefitTerm}
                    isInputInvalid={isInputBenefitTermInvalid}
                    errorMessage={errorMessageBenefitTerm}
                    additionalAttributes={{type:"text", autoComplete:"off"}}/>

                    <Input 
                    id="benefitPlacesId"
                    label="Plazas habilitadas con este beneficio" 
                    value={benefitPlaces} 
                    onChangeHandler={onChangeBenefitPlacesHandler}
                    onBlurHandler={onBlurBenefitPlacesHandler}
                    onFocusHandler={onFocusBenefitPlaces}
                    isInputInvalid={isInputBenefitPlacesInvalid}
                    errorMessage={errorMessageBenefitPlaces}
                    additionalAttributes={{type:"text", autoComplete:"off"}}/>
                    <div className={classes.submitButton}>
                        <Button classOfButton="borderButton" label="Crear" onClickHandler={onSubmitHandler} additionalStyle={{color:"black", width:"80%"}} />
                    </div>
                </form>
            </Fragment>    
            
            
            
        
    )
}

export default BenefitForm;