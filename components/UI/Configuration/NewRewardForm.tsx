import React, {Fragment, memo} from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';

import Button from '../Button';
import ImageSelector from '../ImageSelector';
import Input from '../Input';
import { PremiosType } from '../../../data/Configuration/Premio-interface';
import TextArea from '../TextArea';
import {addPoint} from '../../../helpers/addDecimalPoints';
import classes from './NewRewardForm.module.css';
import { uiActions } from '../../../store/ui-slice';
import useInput from '../../../hooks/use-input';
import {useRouter} from 'next/router';
import {useState} from 'react';

export interface NewRewardFormProps{
    onCreatePremio: (e:React.FormEvent<HTMLFormElement>) => void;
}
const NewRewardForm = (props:NewRewardFormProps) =>{
    const [imageLoaded, setImageLoaded] = useState<Blob>();
    const [showNewPremioForm, setShowNewPremioForm] = useState<boolean>(false);
    const [selectedPremioType, setSelectedPremioType] = useState<PremiosType>();
    const pointsToMoney = useAppSelector(state => state.configuration.pointsConversion);
    const dinero_points = (Number('500.000') * 
    Number(pointsToMoney.points ? pointsToMoney.points : 100)) / Number(pointsToMoney.money ? pointsToMoney.money : 100000) ;
    const merchandising_points = Number('200.000') * Number(pointsToMoney.points) / Number(pointsToMoney.money) ;
    const descuentos_points = Number('600.000') * Number(pointsToMoney.points) / Number(pointsToMoney.money) ;
    const DINERO_TEXTINPUTS = ['ej. 500.000Gs. en efectivo', 'ej. Podés retirar 500.000Gs en efectivo de las cajas de la Universidad', 'ej. 500.000Gs', 'ej.' + String(dinero_points)];
    const MERCHANDISING_TEXTINPUTS = ['ej. Mochila Universitaria', 'ej. Mochila universitaria tamaño grande con bolsillos', 'ej. 200.000Gs', 'ej.' + String(merchandising_points)];
    const DESCUENTOS_TEXTINPUTS = ['ej. 600.000Gs menos en tu siguiente cuota', 'ej. Con el vale generado tenés un descuento de 600.000Gs en tu siguiente cuota', 'ej. 600.000Gs', 'ej.' + String(descuentos_points)];
    const router = useRouter();
    const {universityId} = router.query;
    const dispatch = useAppDispatch();
    const money_default_image = '/images/cash_bag.jpeg';
    
    
    const loadImage = (image:Blob) =>{
        setImageLoaded(image);
    }
    const validateTitle = (value:string) =>{
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

    const {value:titleValue, 
        setValue:setTitle,
        onChangeHandler:onTitleChangeHandler, 
        onBlurHandler:onBlurTitleChangeHandler, 
        isInputInvalid:isTitleInputValid,
        errorMessage:errorTitleMessage,
        onFocus:onTitleFocus } = useInput(validateTitle, '');

    const validateDescription = (value:string) =>{
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
    };
    
    const {value:descriptionValue, 
            setValue:setDescription,
            onChangeHandler:onDescriptionChangeHandler, 
            onBlurHandler:onBlurDescriptionChangeHandler, 
            isInputInvalid:isDescriptionInputValid,
            errorMessage:errorDescriptionMessage,
            onFocus:onDescriptionFocus } = useInput(validateDescription, '');

    const validateMonto = (value:string) =>{
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

    
    const {value:montoValue, 
           setValue:setMonto,
           
           onBlurHandler:onBlurMontoChangeHandler, 
           isInputInvalid:isMontoInputValid,
           errorMessage:errorMontoMessage,
           onFocus:onMontoFocus } = useInput(validateMonto, '');

    const onMontoChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) =>{
        const currentValue = event.target.value.replace(/\D/,'');
        const points_to_money = pointsToMoney.points ?  pointsToMoney.points.replace(/\D/,'') : 100;
        const money_equivalence = pointsToMoney.money  ? pointsToMoney.money.replace(/\D/,'') : 100000;
        
        setMonto(addPoint(currentValue));
        const points = (Number(currentValue) * Number(points_to_money)) / Number(money_equivalence);
        
        setPoints(String(points));
        
    }
            

    const validatePoints = (value:string) =>{
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
            
    const {value:pointsValue, 
           setValue:setPoints,
           onChangeHandler:onPointsChangeHandler, 
           onBlurHandler:onBlurPointsChangeHandler, 
           isInputInvalid:isPointsInputValid,
           errorMessage:errorPointsMessage,
           onFocus:onPointsFocus } = useInput(validatePoints, '');

           

    const onChangeInputHandler = (event:React.ChangeEvent<HTMLInputElement>) =>{
        const selectedValue = event.target.value;
        
        if(selectedValue === PremiosType.dinero){
            setSelectedPremioType(PremiosType.dinero);
            setTitle(DINERO_TEXTINPUTS[0]);
            setDescription(DINERO_TEXTINPUTS[1]);
            setMonto(DINERO_TEXTINPUTS[2]);
            setPoints(DINERO_TEXTINPUTS[3]);
        }
        if(selectedValue === PremiosType.merchandising){
            setSelectedPremioType(PremiosType.merchandising);
            setTitle(MERCHANDISING_TEXTINPUTS[0]);
            setDescription(MERCHANDISING_TEXTINPUTS[1]);
            setMonto(MERCHANDISING_TEXTINPUTS[2]);
            setPoints(MERCHANDISING_TEXTINPUTS[3]);
        }
        if(selectedValue === PremiosType.descuento){
            setSelectedPremioType(PremiosType.descuento)
            setTitle(DESCUENTOS_TEXTINPUTS[0]);
            setDescription(DESCUENTOS_TEXTINPUTS[1]);
            setMonto(DESCUENTOS_TEXTINPUTS[2]);
            setPoints(DESCUENTOS_TEXTINPUTS[3]);
        }
        setShowNewPremioForm(true);

    }

    const onSubmitHandler = async (event:React.FormEvent) =>{
        event.preventDefault();
        if(imageLoaded && !isTitleInputValid && !isDescriptionInputValid &&
            !isMontoInputValid && !isPointsInputValid){
                const body = new FormData();
                body.append("title", titleValue);
                body.append("description", descriptionValue);
                body.append("monto", montoValue);
                body.append("image", imageLoaded);
                body.append("equivalente_puntos", pointsValue);
                body.append("premioType", PremiosType.dinero);
                const result = await fetch(`/api/configuration/${universityId}/reward/`,{
                    method:'POST',
                    body:body
                });
                if(!result.ok){
                    dispatch(uiActions.showNotification({show:true, message:"Hubo un problema al guardar el beneficio", color:'red'}))
                }else{
                    dispatch(uiActions.showNotification({show:true, message:"Creación exitosa", color:'green'}))
                    router.push(`/${universityId}/configuration/premios`);
                    
                }
                router.push(`/${universityId}/configuration/premios`);
        }
        
        
        

    }
        
    
    return(
        <Fragment>
            <form className={classes.form}>
                <h3 className={classes.tituloTipoPremio}>Seleccione el tipo de Premio:</h3>
                <div className={classes.selectBox}>
                    <input type='radio' id="moneyId" name="premioType" value={PremiosType.dinero} onChange={onChangeInputHandler} />
                    <label htmlFor='moneyId'>Dinero</label>
                </div>
                <div className={classes.selectBox}>
                    <input type='radio' id="merchandisingId" name="premioType" value={PremiosType.merchandising} onChange={onChangeInputHandler} />
                    <label htmlFor='merchandisingId'>Merchandising</label>
                </div>
                <div className={classes.selectBox}>
                    <input type='radio' id="descuentosId" name="premioType" value={PremiosType.descuento} onChange={onChangeInputHandler}/>
                    <label htmlFor='moneyId'>Descuentos en cursos</label>
                </div>
                {showNewPremioForm && <Fragment>
                    {selectedPremioType === PremiosType.dinero ? 
                    <ImageSelector imageLoaded={loadImage} label={'Imagen del Premio'} image={money_default_image}  /> :
                    <ImageSelector imageLoaded={loadImage} label={'Imagen del Premio'}  />}
                    <Input 
                        id="titleId"
                        label="Titulo" 
                        value={titleValue} 
                        onChangeHandler={onTitleChangeHandler}
                        onBlurHandler={onBlurTitleChangeHandler}
                        onFocusHandler={onTitleFocus}
                        isInputInvalid={isTitleInputValid}
                        errorMessage={errorTitleMessage}
                        additionalAttributes={{type:"text", autoComplete:"off"}}/>
                    
                    <TextArea 
                        label="Descripción"
                        value={descriptionValue}
                        onChangeHandler={onDescriptionChangeHandler}
                        onBlurHandler={onBlurDescriptionChangeHandler}
                        onFocusHandler={onDescriptionFocus}
                        isInputInvalid={isDescriptionInputValid}
                        errorMessage={errorDescriptionMessage}
                        rows={5}
                        cols={5}
                        />
                    <Input 
                        id="montoId"
                        label="Monto (Gs)" 
                        value={montoValue} 
                        onChangeHandler={onMontoChangeHandler}
                        onBlurHandler={onBlurMontoChangeHandler}
                        onFocusHandler={onMontoFocus}
                        isInputInvalid={isMontoInputValid}
                        errorMessage={errorMontoMessage}
                        additionalAttributes={{type:"text", autoComplete:"off"}}/>

                    <Input 
                        id="pointsId"
                        label="Equivalencia en puntos" 
                        value={pointsValue} 
                        onChangeHandler={onPointsChangeHandler}
                        onBlurHandler={onBlurPointsChangeHandler}
                        onFocusHandler={onPointsFocus}
                        isInputInvalid={isPointsInputValid}
                        errorMessage={errorPointsMessage}
                        additionalAttributes={{type:"text", autoComplete:"off", readOnly:true}}/>
                    <div className={classes.submitButton}>
                        <Button classOfButton="borderButton" label="Crear" 
                        onClickHandler={onSubmitHandler} 
                        additionalStyle={{color:"black", width:"80%"}} />
                    </div>
                </Fragment>
            }
            </form>

        </Fragment>
    )

}

export default memo(NewRewardForm);