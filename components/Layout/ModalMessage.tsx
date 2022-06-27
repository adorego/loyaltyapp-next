import Button from "../UI/Button"
import Portal from "./Portal"
import classes from './ModalMessage.module.css';

export interface ModalMessageProps{
    message:string;
    confirmCallBack:() => void;
    closeCallBack:() => void;
}
const ModalMessage = (props:ModalMessageProps) =>{
    
        return(
            <Portal>
                <div className={classes.BackDrop}>
                    <div className={classes.Centered}>
                        <div className={classes.ModalContainer}>
                            <div className={classes.Header}></div>
                            <h2 className={classes.Message}>{props.message}</h2>
                            <Button 
                            additionalStyle={{backgroundColor:"var(--primary-color)", 
                            color:"var(--on-primary-text-color)", 
                            width:"192px", height:"49px"}} 
                            label="Confirmar" 
                            onClickHandler={props.confirmCallBack} ></Button>
                            <div className={classes.CloseButton} onClick={props.closeCallBack} >X</div>
                        </div>
                    </div>
                </div>
            </Portal>
        )

}

export default ModalMessage;