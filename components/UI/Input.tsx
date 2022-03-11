import {Fragment, forwardRef, memo} from 'react';

import InputInterface from "../../data/Input-interface";
import classes from './Input.module.css';

const Input = forwardRef<HTMLInputElement, InputInterface>((props, ref) => {
    
    const inputClass = `${classes.inputClass} ${props.isInputInvalid ? classes.invalid : ''}`;
    // console.log('inputClass:', inputClass);
    return(
        
            <div className={classes.formControl}>
                <label className={classes.label} htmlFor={props.id}>{props.label}</label>
                <input className={inputClass} 
                id={props.id} 
                ref={ref}
                onChange={props.onChangeHandler} 
                onBlur={props.onBlurHandler} 
                onFocus={props.onFocusHandler}
                value={props.value}
                {...props.additionalAttributes} />
                {/* <p className={classes.helpMessage}>{props.helpMessage}</p> */}
                {props.isInputInvalid && <p className={classes.errorMessage}>{props.errorMessage}</p>}
            </div>
    
    )
});

Input.displayName = 'Input'

export default memo(Input);