import React, { useState } from "react";

import LandingSectionCreator from "./LandingSectionCreator";
import classes from "./GeneralRegistration.module.css";

const GeneralRegistration = () => {
    const [typeSelected, setTypeSelected] = useState('');

    const onSelectionChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        // console.log('Selected:', e.target.value);
        setTypeSelected(e.target.value);
    }
    return(
        <div className={classes.container}>
            <div className={classes.selectionContainer}>
                <div className={classes.inputContainer}>
                    <input type="radio" id="institucionalId" name={"generalRegistrationOptions"} value={"institucional"} onChange={onSelectionChange} />
                    <label htmlFor="institucionalId">Institucional</label>
                </div>
                <div className={classes.inputContainer}>
                    <input type="radio" id="institucionalId" name={"generalRegistrationOptions"} value={"carreras"} onChange={onSelectionChange}/>
                    <label htmlFor="institucionalId">Carreras</label>
                </div>
                
                <div className={classes.inputContainer}>
                    <input type="radio" id="institucionalId" name={"generalRegistrationOptions"} value={"testimonios"} onChange={onSelectionChange}/>
                    <label htmlFor="institucionalId">Testimonios</label>
                </div>
            </div>
            {typeSelected && <LandingSectionCreator title={typeSelected} />}
        </div>
    )
}

export default GeneralRegistration;