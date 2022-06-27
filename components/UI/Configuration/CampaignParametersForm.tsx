import Button from "../Button";
import { Fragment } from "react";
import Input from "../Input";
import classes from './CampaignParametersForm.module.css';
import useInput from "../../../hooks/use-input";

export interface CampaignParameters{
    startDay:string;
    endDay:string;
    term:number;
    places:number;
}
export interface CampaignParametersProps{
    onNextClickHandler:(parameters:CampaignParameters) => void;
}
const CampaignParametersForm = (props:CampaignParametersProps) =>{

    //Start Day Input Definition
    const validateCampaignStartDay = (value:string) =>{
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
    const {value:campaignStartDayValue, 
        onChangeHandler:onChangeCampaignStartDayHandler, 
        onBlurHandler:onBlurCampaignStartDayHandler,
        isInputInvalid: isInputCampaignStartDayInvalid,
        errorMessage:errorMessageCampaignStartDay,
        onFocus:onFocusCampaignStartDay} = useInput(validateCampaignStartDay, 
            "");

    //End Day Input Definition
    const validateCampaignEndDay = (value:string) =>{
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
    const {value:campaignEndDayValue, 
        onChangeHandler:onChangeCampaignEndDayHandler, 
        onBlurHandler:onBlurCampaignEndDayHandler,
        isInputInvalid: isInputCampaignEndDayInvalid,
        errorMessage:errorMessageCampaignEndDay,
        onFocus:onFocusCampaignEndDay} = useInput(validateCampaignEndDay, 
            "");
    //Term Input Definition
    const validateCampaignTerm = (value:string) =>{
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
    const {value:campaignTermValue, 
        onChangeHandler:onChangeCampaignTermHandler, 
        onBlurHandler:onBlurCampaignTermHandler,
        isInputInvalid: isInputCampaignTermInvalid,
        errorMessage:errorMessageCampaignTerm,
        onFocus:onFocusCampaignTerm} = useInput(validateCampaignTerm, 
            "");
    
    //Places Input Definition
    const validateCampaignPlaces = (value:string) =>{
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
    const {value:campaignPlacesValue, 
        onChangeHandler:onChangeCampaignPlacesHandler, 
        onBlurHandler:onBlurCampaignPlacesHandler,
        isInputInvalid: isInputCampaignPlacesInvalid,
        errorMessage:errorMessageCampaignPlaces,
        onFocus:onFocusCampaignPlaces} = useInput(validateCampaignPlaces, 
            "");

    const onNextClickHandler = () =>{
        console.log('Click Next Button');
        console.log('StartDay:', campaignStartDayValue);
        props.onNextClickHandler({
            startDay:campaignStartDayValue,
            endDay:campaignEndDayValue,
            term:Number(campaignTermValue),
            places:Number(campaignPlacesValue)
        })
    }
    const enableNextButton = !isInputCampaignStartDayInvalid 
                            && !isInputCampaignEndDayInvalid 
                            && !isInputCampaignTermInvalid 
                            && !isInputCampaignPlacesInvalid;
    return(
        <Fragment>
            <div className={classes.container}>
                <div className={classes.startDayContainer}>
                    <Input 
                        id="startDayId"
                        label="Fecha de Inicio" 
                        value={campaignStartDayValue} 
                        onChangeHandler={onChangeCampaignStartDayHandler}
                        onBlurHandler={onBlurCampaignStartDayHandler}
                        onFocusHandler={onFocusCampaignStartDay}
                        isInputInvalid={isInputCampaignStartDayInvalid}
                        errorMessage={errorMessageCampaignStartDay}
                        additionalAttributes={{type:"date", autoComplete:"off"}}/>
                </div>
                <div className={classes.endDayContainer}>
                    <Input 
                        id="endDayId"
                        label="Fecha Fin" 
                        value={campaignEndDayValue} 
                        onChangeHandler={onChangeCampaignEndDayHandler}
                        onBlurHandler={onBlurCampaignEndDayHandler}
                        onFocusHandler={onFocusCampaignEndDay}
                        isInputInvalid={isInputCampaignEndDayInvalid}
                        errorMessage={errorMessageCampaignEndDay}
                        additionalAttributes={{type:"date", autoComplete:"off"}}/>
                </div>
                <div className={classes.termContainer}>
                    <Input 
                        id="termId"
                        label="Validez"
                        helpMessage="Cuantas horas de validez tiene el beneficio una vez recibido por el prospecto"
                        value={campaignTermValue} 
                        onChangeHandler={onChangeCampaignTermHandler}
                        onBlurHandler={onBlurCampaignTermHandler}
                        onFocusHandler={onFocusCampaignTerm}
                        isInputInvalid={isInputCampaignTermInvalid}
                        errorMessage={errorMessageCampaignTerm}
                        additionalAttributes={{type:"text", autoComplete:"off"}}/>
                </div>
                <div className={classes.placesContainer}>
                    <Input 
                        id="placesId"
                        label="Plazas" 
                        helpMessage="Cuantas plazas están habilitadas con este beneficio"
                        value={campaignPlacesValue} 
                        onChangeHandler={onChangeCampaignPlacesHandler}
                        onBlurHandler={onBlurCampaignPlacesHandler}
                        onFocusHandler={onFocusCampaignPlaces}
                        isInputInvalid={isInputCampaignPlacesInvalid}
                        errorMessage={errorMessageCampaignPlaces}
                        additionalAttributes={{type:"text", autoComplete:"off"}}/>
                </div>
            </div>
            <div className={classes.nextButtonContainer}>
                <Button label='Siguiente' 
                    disabled={!enableNextButton}
                    onClickHandler={onNextClickHandler}
                    additionalStyle={{backgroundColor:"var(--secondary-color)", 
                    color:"var(--on-secondary-text-color)", 
                    marginTop:"16px",
                    marginBottom:"16px",
                    width:"100%", height:"49px"}} />
            </div>
        </Fragment>
    )
}

export default CampaignParametersForm;