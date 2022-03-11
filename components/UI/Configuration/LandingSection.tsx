import React, {Fragment, memo, useState} from 'react';

import ImageSelector from '../ImageSelector';
import LandingSectionInterface from '../../../data/UI/LandingSection-interface';
import TextArea from '../TextArea';
import classes from "./LandingSection.module.css";
import useInput from '../../../hooks/use-input';

const LandingSection = (props:LandingSectionInterface) =>{

    const [showInnerContent, setShowInnerContent] = useState(false);

    

    const validateDescription = (value:string) =>{
        return {    
            pass:false,
            errorMessage:""
        }
    }
    const {value, 
        onChangeHandler, 
        onBlurHandler,
        isInputInvalid,
        errorMessage,
        onFocus} = useInput(validateDescription, props.defaultValueText);


    const onChangeSelectHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
       setShowInnerContent(e.target.checked);
    }    
    const imageLoaded = (image:Blob) =>{

    }
    return(
        <Fragment>
            <div className={classes.box}>
                <div className={classes.selectBox}>
                    <input type="checkbox" className={classes.input} id={props.inputId} name={props.inputName} onChange={onChangeSelectHandler} />
                    <label htmlFor={props.inputName} className={classes.inputLabel}>{props.inputLabel}</label>
                </div>
                
                {showInnerContent && 
                <Fragment>
                    <ImageSelector imageLoaded={imageLoaded} />
                    <TextArea 
                    label={props.textAreaLabel}
                    cols={15}
                    rows={20}
                    value={value} 
                    onChangeHandler={onChangeHandler} 
                    onBlurHandler={onBlurHandler} 
                    isInputInvalid={isInputInvalid}
                    errorMessage={errorMessage}
                    onFocusHandler={onFocus} />
                </Fragment>}
            </div>

        </Fragment>
    )
}
export default memo(LandingSection);