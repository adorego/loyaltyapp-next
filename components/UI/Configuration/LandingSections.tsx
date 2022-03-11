import Button from '../Button';
import {Fragment} from 'react';
import LandingSection from '../Configuration/LandingSection';
import LandingSectionsInterface from '../../../data/UI/LandingSections-interface';
import classes from "./LandingSections.module.css";

const LandingSections = (props:LandingSectionsInterface) =>{

    const imageLoaded = (image:Blob) =>{

    }
    return(
        <Fragment>
            <form onSubmit={props.submitHandler}>
                <h3 className={classes.h3}>Secciones a incluir en la Landing Beneficio Digital</h3>
                <LandingSection 
                    defaultValueText='Ej. La Universidad Leland Stanford Junior (Leland Stanford Junior
                        University en inglés), 
                        conocida como Universidad Stanford, es una universidad 
                        privada estadounidense ubicada en Stanford, California, a unos
                        56 km al sureste de San Francisco. Stanford es célebre por la 
                        calidad de su enseñanza, por su riqueza y su proximidad a
                        Silicon Valley, cuna de algunas de las más importantes 
                        empresas de tecnología punta. 
                        Está considerada por todos los listados como una de las 
                        diez mejores universidades del mundo'
                    inputId="intitutionalSectionId" 
                    inputName="institutionalSection" 
                    inputLabel="Sección Institucional" 
                    textAreaLabel='Texto de la Sección Institucional' />

                <LandingSection 
                    defaultValueText='Ej. Juan Gonzalez es alumno del 3 año de Medicina de la Universidad Standford, su objetivo es postularse a una beca completa
                    en los Estados Unidos para especializarse en Pediatría Clinica'
                    inputId="testiminialSectionId" 
                    inputName="testimonialSection" 
                    inputLabel="Sección Testimonios" 
                    textAreaLabel='Texto del Testimonio' />   
                <div className={classes.submitButton}>
                    <Button classOfButton="borderButton" label="Finalizar" additionalStyle={{color:"black", width:"80%"}} />
                </div> 
            </form>


        </Fragment>
    )
}
export default LandingSections;