import { FC, ReactNode } from "react";

import Button from "../UI/Button";
import Portal from "./Portal";
import classes from './ModalContainer.module.css';

export interface ModalContainerProps{
    children:ReactNode;
    additionalStyle?:{};
    closeCallBack:() =>void;
}

const ModalContainer:FC<ModalContainerProps> = ({children, ...props}) =>{
    
    return(
        <Portal>
            <div className={classes.BackDrop}>
                <div className={classes.Centered}>
                    <div className={classes.ModalContainer} style={props.additionalStyle}>
                        
                        {children}
                        <div className={classes.CloseButton} onClick={props.closeCallBack} >X</div>
                    </div>
                </div>
            </div>
        </Portal>
    )

}

export default ModalContainer;