import classes from './TextArea.module.css';

export  interface TextAreaProps{
    id?:string;
    label:string;
    value?:any;
    showHelpMessage:boolean;
    showSeeExample:boolean;
    onHelpClickHandler:(e, data:string) => void;
    showSeeExampleHandler:() => void;
    onChangeHandler?:(event:React.ChangeEvent<HTMLTextAreaElement>)=> void;
    onBlurHandler?:(event:React.FocusEvent<HTMLTextAreaElement>) => void;
    onFocusHandler?:(event:React.FocusEvent<HTMLTextAreaElement>) => void;
    isInputInvalid?:boolean;
    errorMessage?:string;
    additionalAttributes?:{};
    defaultValue?:string;
    helpMessage?:string;
    rows:number;
    cols:number;
                    
}
const TextArea = (props:TextAreaProps) =>{
    const classTextArea = `${classes.textArea} ${props.isInputInvalid ? classes.invalid : ''}`; 
    
    return(
        <div style={{...props.additionalAttributes}}>
            <div className={classes.labelHelpContainer}>
                <div className={classes.labelContainer}>
                    <p className={`${classes.label} body1`}>{props.label}</p>
                </div>
                <div className={classes.helpLinkContainer}>
                    <p 
                    className={`${classes.helpLink} caption`} 
                    onClick={(e) => props.onHelpClickHandler(e, props.id ? props.id : '')}>
                        Ayuda
                    </p>
                </div>
            </div>
            
            
            
            
            {props.showHelpMessage && 
            <p className={`${classes.helpCaption} caption`}>{props.helpMessage}</p>}
            {props.showSeeExample && 
            <p id={'seeExampleLink'} 
            className={`${classes.seeExampleLink} caption`} 
            onClick={props.showSeeExampleHandler}>Ver ejemplo</p>}
            <textarea 
            
            value={props.value}
            onChange={props.onChangeHandler}
            onBlur={props.onBlurHandler}
            onFocus={props.onFocusHandler}
            className={`${classTextArea} body1`} 
            id={props.id} 
            rows={props.rows}
            cols={props.cols}>
            {props.defaultValue}
            </textarea>
            {props.isInputInvalid && <p className={classes.errorMessage}>{props.errorMessage}</p>}
        </div>
    )
}
export default TextArea