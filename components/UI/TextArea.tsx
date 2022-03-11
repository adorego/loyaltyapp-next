import {Fragment} from 'react';
import TextAreaInterface from '../../data/UI/TextArea-interface';
import classes from './TextArea.module.css';

const TextArea = (props:TextAreaInterface) =>{
    const classTextArea = `${classes.textArea} ${props.isInputInvalid ? classes.invalid : ''}`; 
    
    return(
        <Fragment>
            <label className={classes.label} htmlFor={props.id}>{props.label}</label>
            <textarea 
            value={props.value}
            onChange={props.onChangeHandler}
            onBlur={props.onBlurHandler}
            onFocus={props.onFocusHandler}
            className={classTextArea} 
            id={props.id} 
            rows={props.rows}
            cols={props.cols}>
            </textarea>
            {props.isInputInvalid && <p className={classes.errorMessage}>{props.errorMessage}</p>}
        </Fragment>
    )
}
export default TextArea