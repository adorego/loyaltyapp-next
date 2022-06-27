import { useEffect, useState } from "react";

import {createPortal} from 'react-dom';

const Portal = ({children}) =>{
    
    const element = document.querySelector("#modal-root");
    if(element){
        return(  createPortal(children, element)
        )
    }else{
        return(
            <h4>No existe el elemento en el DOM</h4>
        )
    }
}

export default Portal;


