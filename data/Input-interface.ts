export default interface InputInterface{
    id?:string;
    label:string;
    value?:any;
    onChangeHandler?:(event:React.ChangeEvent<HTMLInputElement>)=> void;
    onBlurHandler?:(event:React.FocusEvent<HTMLInputElement>) => void;
    onFocusHandler?:(event:React.FocusEvent<HTMLInputElement>) => void;
    onInputChangeHandler?:(event:React.ChangeEvent<HTMLInputElement>) => void;
    isInputInvalid?:boolean;
    errorMessage?:string;
    defaultValue?:string;
    additionalAttributes?:{};
    helpMessage?:string;
    
}