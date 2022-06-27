import { Fragment, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store-hooks";

import BasicCard from "../../../Layout/BasicCard";
import Button from "../../Button";
import LandingCard from "../../../Layout/LandingCard";
import LandingSectionInterface from "../../../../data/Configuration/LandingSection-interface";
import LandingTemplateInterface from "../../../../data/Configuration/LandingTemplate-interface";
import SeccionHeader from "../../SeccionHeader";
import classes from './LandingTemplateList.module.css';
import { uiActions } from "../../../../store/ui-slice";
import {useRouter} from 'next/router';

export interface LandingTemplateListProps{
    landingTemplatesList:Array<LandingTemplateInterface>;
    newLandingTemplateHandler?: () =>void;
} 
const LandingTemplateList = ({landingTemplatesList, newLandingTemplateHandler}:LandingTemplateListProps) =>{
    const router = useRouter();
    const universitySigla = useAppSelector(state => state.auth.university.sigla);
    const [landingTemplates, setLandingTemplates] = useState<Array<LandingTemplateInterface>>(landingTemplatesList);
    const [showTitleHelp, setTitleHelpShow] = useState(false);
    const dispatch = useAppDispatch();
    

    const onNewLandingClickHandler = () =>{
        router.push(`/${universitySigla}/configuration/landing/nueva`);
    }

    const onHelpClickHandler = () =>{
        setTitleHelpShow(!showTitleHelp);
    }
    
    return(
        <Fragment>
            <SeccionHeader titleText="" centerMarginTitle={false} />
            <div className={classes.titleContainer}>
                    <h4 className={classes.title}>Landings</h4>
                    <p className={`${classes.titleHelp} caption`} onClick={onHelpClickHandler}>Ayuda</p>
            </div>
            {showTitleHelp && 
                <div className={classes.helpContentContainer}>
                    <p className={classes.HelpExample}>La Landing conforma las secciones de información adicional  necesaria para que tu prospecto pueda
                        tomar la decisión. Esta compuesta de diferentes secciones interactivas con toda la información e imagenes que desees. Las secciones se
                        despliegan en un forrmato amigable pre definido denominado <strong>Template</strong></p>
                    {/* <p className={classes.seeHelpExample}>Ver ejemplo</p> */}
                </div>    
            }
            <div className={classes.newLandingContainer}>
                <div className={classes.newLandingButtonContainer}>
                    <Button label='Nueva Landing' 
                                    isAvailable={true}
                                    onClickHandler={onNewLandingClickHandler}
                                    additionalStyle={{backgroundColor:"var(--primary-color)", 
                                    color:"var(--on-primary-text-color)", 
                                    marginTop:"0px",
                                    marginBottom:"0px",
                                    width:"153px", height:"49px"}} 
                    />
                </div>
                <div className={classes.landingTypeSelectionContainer}>
                    <label className={`${classes.typeLabel} subtitle1`}>Tipo:</label>
                    <select id={'landingType'} className={`${classes.selectLandingType} body1`}>
                        <option value="generalRegistration">Matriculación General</option>
                        <option value="specializationRegistration">Matriculación a Especialización</option>
                        <option value="courseRegistration">Matriculación a Curso</option>
                    </select>
                </div>
            </div>
            {landingTemplates.length > 0 ? 
            <div className={classes.LandingTemplateList}>
                {landingTemplates.map(
                    (template) =>{
                   
                    return <LandingCard key={template._id} 
                            id={String(template._id)}
                            numberOfSections={template.numberOfSections}
                            section1_data={template.sections[0]}
                            section2_data={template.sections[1]}
                            section3_data={template.sections[2]}
                            
                    
                    
                    />
                    
                    
                            
                        
                        
                        
                        
                    
                })}
            </div> :
            <h6 style={{textAlign:"center"}}>No tiene modelos de landings creados todavía</h6>
    
    
        }
        </Fragment>
    )
   
}

export default LandingTemplateList;