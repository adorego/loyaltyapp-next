
export function addPoint(str:any){
    
    str = str.replace(/\D/g,'');
    
    let inputValue = str.replace('.', '').split("").reverse().join("");
    
    let newValue = '';
    for(let i = 0; i < inputValue.length; i++){
        if(i % 3 == 0 && i !== 0){
            newValue += '.';
        }
        newValue += inputValue[i];
       
    }
    str = newValue.split("").reverse().join("");
    
    return str;
}