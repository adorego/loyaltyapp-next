import classes from "./Button.module.css";
import {memo} from 'react';

export interface ButtonInterface{
    isAvailable:boolean;
    label:string;
    onClickHandler?:any;
    additionalStyle?:{};
    children?: React.ReactNode;
}
const Button =({isAvailable, ...props}:ButtonInterface) => {
    

    const dynamicClass = classes["button-per"] + " button-app"; //button-app is a global style
    const disabledButton = <button onClick={props.onClickHandler} className={dynamicClass} style={props.additionalStyle} disabled>
                                {props.label}{props.children}
                            </button>
    const enabledButton =  <button onClick={props.onClickHandler} className={dynamicClass} style={props.additionalStyle}    >
                                {props.label}{props.children}
                            </button>


if(!isAvailable){
    // console.log('disabled button');
    return disabledButton;
}else{
    // console.log('Enabled button');
    return enabledButton;
}
    
}


export default Button;