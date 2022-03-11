import {useState} from 'react';

type validator = {
    pass:boolean,
    errorMessage:string
}

const useInput = (validationFunc: (a:string) => validator, defaultValue:string='' ) => {

    const [value, setValue] = useState(defaultValue);
    const [isTouched, setIsTouched] = useState(false);

    const validationError = validationFunc ? validationFunc(value).errorMessage : '';
    const valueIsValid =  validationFunc ? validationFunc(value).pass: false;
    const isInputInvalid = !valueIsValid && isTouched;
    
    const onChangeHandler = (event:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>{
        
        setValue(event.target.value);
    }

    const onBlurHandler = (event:React.FocusEvent<HTMLInputElement| HTMLTextAreaElement>) =>{
        setIsTouched(true);
        
    }

    const onFocus = (event:React.FocusEvent<HTMLInputElement| HTMLTextAreaElement>) => {
        if(!isTouched){
            setValue("");
        }
        
    }
    
    return(
        {
            value,
            onChangeHandler,
            onBlurHandler,
            isInputInvalid,
            errorMessage:validationError,
            onFocus
        }
    )
}

export default useInput;