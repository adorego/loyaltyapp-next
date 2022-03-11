export default interface InputInterface{
    id?:string;
    label:string;
    value?:any;
    onChangeHandler?:(event:React.ChangeEvent<HTMLInputElement>)=> void;
    onBlurHandler?:(event:React.FocusEvent<HTMLInputElement>) => void;
    onFocusHandler?:(event:React.FocusEvent<HTMLInputElement>) => void;
    isInputInvalid?:boolean;
    errorMessage?:string;
    additionalAttributes?:{};
    helpMessage?:string;
    
}