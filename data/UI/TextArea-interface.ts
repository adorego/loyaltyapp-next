export default interface TextAreaInterface{
    id?:string;
    label:string;
    value?:any;
    onChangeHandler?:(event:React.ChangeEvent<HTMLTextAreaElement>)=> void;
    onBlurHandler?:(event:React.FocusEvent<HTMLTextAreaElement>) => void;
    onFocusHandler?:(event:React.FocusEvent<HTMLTextAreaElement>) => void;
    isInputInvalid?:boolean;
    errorMessage?:string;
    additionalAttributes?:{};
    helpMessage?:string;
    rows:number;
    cols:number;
                    
}