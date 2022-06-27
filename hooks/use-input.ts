import {useState} from 'react';

type validator = {
    pass:boolean,
    errorMessage:string
}

const useInput = (validationFunc: (a:string) => validator, defaultValue:string='', touched=false ) => {

    const [value, setValue] = useState(defaultValue);
    const [isTouched, setIsTouched] = useState(false);

    const validationError = validationFunc ? validationFunc(value).errorMessage : '';
    const valueIsValid =  validationFunc ? validationFunc(value).pass: false;
    const isInputInvalid = !touched ? !valueIsValid && isTouched : !valueIsValid
    
    const onChangeHandler = (event:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>{
        
        setValue(event.target.value);
        
        
        
    }

    const onChangeNumberHandler = (event:React.ChangeEvent<HTMLInputElement>) =>{
        const currentValue = event.target.value;
        const modifyValue = currentValue.replace(/\,|\./g,'');
        let finalValue;
        if(!isNaN(Number(currentValue))){
            const numberFormat = Intl.NumberFormat("es-PY");
            finalValue = numberFormat.format(Number(modifyValue));
            setValue(finalValue);
        }
    }

    const onBlurHandler = (event:React.FocusEvent<HTMLInputElement| HTMLTextAreaElement>) =>{
        setIsTouched(true);
        
    }

    const onFocus = (event:React.FocusEvent<HTMLInputElement| HTMLTextAreaElement>) => {
        if(!isTouched && !touched){
            setValue("");
        }
        
        
    }
    
    return(
        {
            value,
            setValue,
            onChangeHandler,
            onChangeNumberHandler,
            onBlurHandler,
            isInputInvalid,
            errorMessage:validationError,
            onFocus,
            isTouched,
            valueIsValid
        }
    )
}

export default useInput;