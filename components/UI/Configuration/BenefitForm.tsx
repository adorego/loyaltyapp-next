import React, {Fragment, useState} from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/store-hooks";

import Benefit from "../../../data/Configuration/Benefit";
import Button from "../Button";
import ImageSelector from "../ImageSelector";
import Input from "../Input";
import ModalLandingTemplate from "../../Layout/ModalLandingTemplate";
import TextArea from "../TextArea";
import classes from './BenefitForm.module.css';
import classesSpinner from '../../../styles/spinner.module.css';
import { uiActions } from "../../../store/ui-slice";
import useInput from "../../../hooks/use-input";
import {useRouter} from 'next/router';

export interface BenefitFormProps{
    edit:boolean;
    benefitValue?:Benefit;
    title:string;
}
const BenefitForm = (props:BenefitFormProps) => {
    const [benefitImage, setBenefitImage] = useState<Blob>();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const universitySiglaId = useAppSelector(state => state.auth.university.sigla);
    const [helpMessageShow, setHelpMessageShow] = useState(0);
    const [showExample, setShowExample] = useState(false);

    //Benefit image
    const imageLoaded = (image:Blob, newLoaded:boolean) =>{
        setBenefitImage(image);
    }

    //Benefit Page Header
    const validateBenefitPageHeader = (value:string) =>{
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

    const {value:benefitPageHeaderValue, 
        onChangeHandler:onChangeBenefitPageHeaderHandler, 
        onBlurHandler:onBlurBenefitPageHeaderHandler,
        isInputInvalid: isInputBenefitPageHeaderInvalid,
        errorMessage:errorMessageBenefitPageHeader,
        onFocus:onFocusBenefitPageHeader} = useInput(validateBenefitPageHeader, 
            props.edit && props.benefitValue ? props.benefitValue.pageHeader : 
            'Ej. Beneficios Digitales Universidad Standfor', props.edit);
    //Benefit Page Header
    const validateBenefitExclusiveComunication = (value:string) =>{
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

    const {value:benefitExclusiveComunicationValue, 
        onChangeHandler:onChangeBenefitExclusiveComunicationHandler, 
        onBlurHandler:onBlurBenefitExclusiveComunicationHandler,
        isInputInvalid: isInputBenefitExclusiveComunicationInvalid,
        errorMessage:errorMessageBenefitExclusiveComunication,
        onFocus:onFocusBenefitExclusiveComunication} = useInput(validateBenefitExclusiveComunication, 
        props.edit && props.benefitValue ? props.benefitValue.exclusiveComunication :  
        'Ej. Beneficio Exclusivo para Juan Gonzalez (use $prospecto) a través de Javier Perez (use $promotor)' , props.edit);


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
        onFocus:onFocusBenefitTitle} = useInput(validateBenefitTitle, 
        props.edit && props.benefitValue ? props.benefitValue.title : 'Ej. 100% matricula exonerada', props.edit);

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
        onFocus:onFocusBenefitDescription} = useInput(validateBenefitDescription, 
        props.edit && props.benefitValue ? props.benefitValue.description :
        `Ej. Con este beneficio podés comenzar la carrera y pagas tu primera cuota recien al siguiente mes`, props.edit);

    
                
    //End of Form 1

    const onSubmitHandler = async (e:React.FormEvent) =>{
        e.preventDefault();
        
        // console.log('Submitting form...', universityId);
        if(benefitImage && 
            !isInputBenefitPageHeaderInvalid &&
            !isInputBenefitExclusiveComunicationInvalid &&
            !isInputBenefitTitleInvalid && 
            !isInputBenefitDescriptionInvalid){
            // console.log('Validation ok');
            const body = new FormData();
            props.edit ? body.append("id", String(props.benefitValue?._id)) : '';
            body.append("image", benefitImage);
            body.append("benefitPageHeader", benefitPageHeaderValue);
            body.append("benefitExclusiveComunication", benefitExclusiveComunicationValue)
            body.append("benefitTitle", benefitTitle);
            body.append("benefitDescription", benefitDescription);
            const result = await fetch(`/api/configuration/${universitySiglaId}/benefits`,{
                method:'POST',
                body:body
            });
            const data = await result.json()
            console.log('data:', data);
            if(!result.ok){
                dispatch(uiActions.showNotification({show:true, message:`No se pudo crear el Beneficio:${data.message}`, color:"red"}))
            }else{
                dispatch(uiActions.showNotification({show:true, message:'Beneficio creado correctamente.', color:"green"}));
                router.push(`/${universitySiglaId}/configuration/beneficios`);
            }
            
        }else{
            dispatch(uiActions.showNotification({show:true, message:'No se pudieron enviar los datos, los datos no estan completos.', color:"red"}))
        }
    }

    const onHelpClickHandler =(e:React.MouseEvent<HTMLParagraphElement>, id:string) =>{
        e.preventDefault();
        switch(id){
            case('benefitHeaderId'):
                helpMessageShow !== 1 ? setHelpMessageShow(1) : setHelpMessageShow(0);
                break;
            case('exclusiveComunicationId'):
                helpMessageShow !== 2 ? setHelpMessageShow(2) : setHelpMessageShow(0);
                break;
            case('descriptionId'):
                helpMessageShow !== 3 ? setHelpMessageShow(3) : setHelpMessageShow(0);
                break;
            default:
                setHelpMessageShow(0);
        }
    }

    const showBenefitExampleHandler = () =>{
        setShowExample(true);
    }

    

    const enableCreateButton = props.edit ? true : benefitImage !== undefined &&  
                               !isInputBenefitPageHeaderInvalid &&
                               !isInputBenefitExclusiveComunicationInvalid &&
                               !isInputBenefitTitleInvalid  && 
                               !isInputBenefitDescriptionInvalid ;

    
    
    return(
        
        <Fragment>
                {loading && <div className={classesSpinner['lds-dual-ring']}></div>}
                {showExample && <ModalLandingTemplate />}
                    <form className={classes.form} autoComplete="off" onSubmit={onSubmitHandler}>  
                        <h4 className={classes.title}>{props.title}</h4>
                        <div className={classes.imageContainer}>
                            <ImageSelector imageLoaded={imageLoaded}  label="Imagen del beneficio" image={props.edit && props.benefitValue ? props.benefitValue.image_frontEnd : ''}/>
                        </div>
                        <div className={classes.pageHeaderContainer}>
                                    
                                    <TextArea
                                        label={"Encabezado de la sección \n de Beneficio "}
                                        helpMessage="La sección del Beneficio personalizado es lo primero que vé el Prospecto, el encabezado le permite entender
                                        de donde proviene el beneficio, por ejemplo: Beneficios Digitales Universidad de Standford, le permite saber que es una propuesta de dicha
                                        Universidad"
                                        showHelpMessage={helpMessageShow === 1 ? true : false}
                                        showSeeExample={helpMessageShow === 1 ? true : false}
                                        showSeeExampleHandler={showBenefitExampleHandler}
                                        onHelpClickHandler={onHelpClickHandler}
                                        id="benefitHeaderId"
                                        value={benefitPageHeaderValue}
                                        onChangeHandler={onChangeBenefitPageHeaderHandler}
                                        onBlurHandler={onBlurBenefitPageHeaderHandler}
                                        onFocusHandler={onFocusBenefitPageHeader}
                                        isInputInvalid={isInputBenefitPageHeaderInvalid}
                                        errorMessage={errorMessageBenefitPageHeader}
                                        rows={10}
                                        cols={20} />
                                       
                                        
                        </div>
                        
                         <div className={classes.exclusiveComunicationContainer}>
                                    <TextArea
                                        label="Comunicado de Beneficio Exclusivo"
                                        helpMessage="Cada Beneficio es personal y exclusivo para cada prospecto, este texto aparece justo después del encabezado
                                        principal del Beneficio y transmite la exclusividad de este Beneficio, ejemplo: Este es un Beneficio exclusivo para 
                                        Juan Gonzalez (prospecto) a través de Julio Perez(promotor). Utiliza $prospecto y $promotor en el texto para que posteriormente
                                        sean modificados por los nombres reales"
                                        showHelpMessage={helpMessageShow ===2 ? true : false}
                                        showSeeExample={helpMessageShow === 2 ? true : false}
                                        showSeeExampleHandler={showBenefitExampleHandler}
                                        onHelpClickHandler={onHelpClickHandler}
                                        id="exclusiveComunicationId"
                                        value={benefitExclusiveComunicationValue}
                                        onChangeHandler={onChangeBenefitExclusiveComunicationHandler}
                                        onBlurHandler={onBlurBenefitExclusiveComunicationHandler}
                                        onFocusHandler={onFocusBenefitExclusiveComunication}
                                        isInputInvalid={isInputBenefitExclusiveComunicationInvalid}
                                        errorMessage={errorMessageBenefitExclusiveComunication}
                                        rows={10}
                                        cols={20} />
                                       
                                        
                        </div>
                            
                            
                        
                        
                        <div className={classes.titleContainer}>
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
                        </div>
                        <div className={classes.descriptionContainer}>
                                <TextArea 
                                    label="Descripción"
                                    helpMessage="La sección del Beneficio personalizado es lo primero que vé el Prospecto, el encabezado le permite entender
                                        de donde proviene el beneficio, por ejemplo: Sistema de Beneficios de Standford le permite saber que es una propuesta de dicha
                                        Universidad"
                                    showHelpMessage={helpMessageShow === 3 ? true : false}
                                    showSeeExample={helpMessageShow === 3 ? true : false}
                                    showSeeExampleHandler={showBenefitExampleHandler}
                                    onHelpClickHandler={onHelpClickHandler}
                                    id="descriptionId"
                                    value={benefitDescription}
                                    onChangeHandler={onChangeBenefitDescriptionHandler}
                                    onBlurHandler={onBlurBenefitDescriptionHandler}
                                    onFocusHandler={onFocusBenefitDescription}
                                    isInputInvalid={isInputBenefitDescriptionInvalid}
                                    errorMessage={errorMessageBenefitDescription}
                                    rows={10}
                                    cols={20}
                                    
                                    />
                                   
                                    
                        </div>
                        <div className={classes.submitButtonContainer}>
                            <Button label='Crear' 
                                isAvailable={enableCreateButton}
                                additionalStyle={{backgroundColor:"var(--primary-color)", 
                                color:"var(--on-primary-text-color)", 
                                margin:"0px 0px 32px 0px",
                                width:"100%", height:"49px"}} />
                        </div>
                        
                    </form>
                    
                    
                   
            
            </Fragment>    
            
            
            
        
    )
}

export default BenefitForm;