import {forwardRef, memo} from 'react';

import InputInterface from "../../data/Input-interface";
import classes from './Input.module.css';

const defaultValues = {
    label:"",
    withIcon:false,
    
}
const Input = forwardRef<HTMLInputElement, InputInterface>((props = defaultValues, ref) => {
    
    const inputClass = `${classes.inputClass} body1 ${props.isInputInvalid ? classes.invalid : ''}`;
    // console.log('inputClass:', inputClass);
    return(
        
            <div className={classes.formControl}>
                <label className={classes.label} htmlFor={props.id}>{props.label}</label>
                {props.helpMessage && <p className={`${classes.helpMessage} caption`}>{props.helpMessage}</p>}
                <input className={inputClass} 
                    id={props.id} 
                    ref={ref}
                    onChange={props.onChangeHandler} 
                    onInput={props.onInputChangeHandler}
                    onBlur={props.onBlurHandler} 
                    onFocus={props.onFocusHandler}
                    value={props.value}
                    
                    {...props.additionalAttributes} >
                </input>
                {props.isInputInvalid && <p className={classes.errorMessage}>{props.errorMessage}</p>}
            </div>
                    
                   
                    
                
                
                
            
    
    )
});

Input.displayName = 'Input'

export default memo(Input);