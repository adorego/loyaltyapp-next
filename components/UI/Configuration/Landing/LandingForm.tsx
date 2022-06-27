import React, { Fragment, useState } from 'react';

import LandingCreator from './LandingCreator';
import SeccionHeader from '../../SeccionHeader';
import classes from './LandingForm.module.css';

export interface LandingFormProps{

}
const LandingForm = () =>{
    const [showTitleHelp, setTitleHelpShow] = useState(false);
    const [landingType, setLandingType] = useState('generalRegistration');
    
    const onLandingTypeSelected = (e:React.ChangeEvent<HTMLSelectElement>) =>{
        setLandingType(e.target.value);
    }

    const onHelpClickHandler = () =>{
        setTitleHelpShow(!showTitleHelp);
    }

   

    const onNextClickHandler = () =>{
        
    }

    return(
        <Fragment>
            <SeccionHeader titleText='' centerMarginTitle={false} />
            <div className={classes.titleContainer}>
                <h4 className={classes.title}>Nueva Landing</h4>
                <p className={`${classes.titleHelp} caption`} onClick={onHelpClickHandler}>Ayuda</p>
            </div>
            
            {showTitleHelp && 
                <div className={classes.helpContentContainer}>
                    <p className={classes.HelpExample}>La Landing es la pagina web o aplicación que contiene toda la información necesaria para que tu prospecto pueda
                        tomar la decisión. Esta compuesta de diferentes secciones interactivas con toda la información e imagenes que desees. Las secciones se
                        despliegan en un forrmato amigable pre definido denominado <strong>Template</strong></p>
                    <p className={classes.seeHelpExample}>Ver ejemplo</p>
                </div>    
            }
            <div className={classes.landingTypeSelectionContainer}>
                    <label className={`${classes.typeLabel} subtitle1`}>Tipo:</label>
                    <select id={'landingType'} className={`${classes.selectLandingType} body1`} value={landingType} 
                        onChange={onLandingTypeSelected}
                        onLoad={onLandingTypeSelected}>
                        <option value="generalRegistration">Matriculación General</option>
                        <option value="specializationRegistration">Matriculación a Especialización</option>
                        <option value="courseRegistration">Matriculación a Curso</option>
                    </select>
            </div>
           
            <LandingCreator type={landingType} />
        </Fragment>
    )
}
export default LandingForm;