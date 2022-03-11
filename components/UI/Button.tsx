import ButtonInterface from "../../data/UI/Button-interface";
import classes from "./Button.module.css";
import {memo} from 'react';

const Button =(props:ButtonInterface) => {
    const {classOfButton} = props;
    const classNames = classes[classOfButton];
    const disabledButton = <button onClick={props.onClickHandler} className={classNames} style={props.additionalStyle} disabled>
                                {props.label}{props.children}
                            </button>
    const enabledButton =  <button onClick={props.onClickHandler} className={classNames} style={props.additionalStyle}>
                                {props.label}{props.children}
                            </button>


if(props.disabled){
    // console.log("disabled button");
    return disabledButton;
}else{
    return enabledButton;
}
    
}


export default memo(Button);