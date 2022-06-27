import React, { Fragment, useRef, useState } from 'react';

import Input from '../../Input';
import MultipleImageSelector from '../../MultipleImageSelector';
import TextArea from '../../TextArea';
import classes from './LandingSectionCreator.module.css';
import useInput from '../../../../hooks/use-input';

export interface LandingCreatorProps{
    title:string;
}
const LandingSectionCreator = (props:LandingCreatorProps) =>{

    const [iteration, setIteration] = useState(0);

    const selectedFormat = useRef<string>();

    const transformTitle = (value:string):string =>{
        return value.length > 0 ? value.split('')[0].toUpperCase() + value.slice(1) : '';
    }

    const onTituloClickHandler = () =>{
        iteration != 1 ? setIteration(1) : setIteration(0);
    }

    const onFormatoDeLaSeccionClickHandler = () =>{
        iteration != 2 ? setIteration(2) : setIteration(0);
    }

    const onSectionContentClickHandler = () =>{
        iteration != 3 ? setIteration(3) : setIteration(0);
    }

    const onFormatSelected = (e:React.ChangeEvent<HTMLInputElement>) =>{
        selectedFormat.current = String(e.target.value);
    }

    //Benefit description
    // const {value:benefitDescription, 
    //     onChangeHandler:onChangeBenefitDescriptionHandler, 
    //     onBlurHandler:onBlurBenefitDescriptionHandler,
    //     isInputInvalid: isInputBenefitDescriptionInvalid,
    //     errorMessage:errorMessageBenefitDescription,
    //     onFocus:onFocusBenefitDescription} = useInput(validateSectionText, 
    //     `Escribe aqui el contenido de la sección`, true);


    
    return(
        <div className={classes.container}>
            <h5>{'Sección ' + transformTitle(props.title)}</h5>
            <div className={classes.titleContainer} onClick={onTituloClickHandler}>
                    <div className={`${classes.iterationNumberContainer}`}>
                        <h4 className={`${classes.iterationNumber}`}>1</h4>
                    </div>
                    <h5 className={classes.sectionTitle}>Titulo</h5>
            </div>
            {iteration === 1 && 
            
                <div className={classes.inputTitleContainer}>
                    <Input label='Titulo de la Sección' additionalAttributes={{width:"100%"}} />
                </div>
                
            }
            <div className={classes.titleContainer} onClick={onFormatoDeLaSeccionClickHandler}>
                        <div className={`${classes.iterationNumberContainer}`}>
                            <h4 className={`${classes.iterationNumber}`}>2</h4>
                        </div>
                        <h5 className={classes.sectionTitle}>Formato de la sección</h5>
            </div>
            {iteration === 2 && 
            <Fragment>
                <div className={classes.selectionContainer}>
                    <div className={classes.inputFormatContainer}>
                        <input type="radio" id="oneTextId" name="sectionFormats" value={"oneText"} onChange={onFormatSelected} />
                        <label htmlFor="oneTextId">Un único texto para toda la sección</label>
                    </div>
                    <div className={classes.inputFormatContainer}>
                        <input type="radio" id="manyTextId" name="sectionFormats" value={"manyText"} onChange={onFormatSelected}/>
                        <label htmlFor="manyTextId">Cada imágen tiene un texto</label>
                    </div>
                </div>
            </Fragment>}
            <div className={classes.titleContainer} onClick={onSectionContentClickHandler}>
                        <div className={`${classes.iterationNumberContainer}`}>
                            <h4 className={`${classes.iterationNumber}`}>3</h4>
                        </div>
                        <h5 className={classes.sectionTitle}>Contenido de la Sección</h5>
            </div>
            {console.log("iteration:", iteration, "selectedFormat:", String(selectedFormat.current))}
            {iteration === 3 && String(selectedFormat.current) === 'oneText' && 
                    <div className={classes.multipleImagesContainer}>
                        <MultipleImageSelector />
                    
                    </div>
            }
            
        </div>
    )
}

export default LandingSectionCreator;