import {FaCheckCircle, FaTimesCircle} from "react-icons/fa";
import React, { FC, ReactNode, memo, useEffect, useMemo, useState } from "react";

import { CardInterface } from "../../data/Card-interface";
import CardSection from './CardSection';
import CrudToolBar from "../UI/CrudToolBar";
import ModalLandingTemplate from "./ModalLandingTemplate";
import classes from './Card.module.css';
import { uiActions } from "../../store/ui-slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const Card:FC<CardInterface> = ({children, ...props}) => {

    const [showPortal, setShowPortal] = useState(false);
    const cardValidity = false;
    const router = useRouter();
    const {universityId:universitySiglaId} = router.query;
    const dispatch = useDispatch();

    const onLink1Click = (e:React.MouseEvent<HTMLAnchorElement>) =>{
        setShowPortal(true);
    }
    
    const onEditClickHandler = () =>{
       
        const benefitId = props.id;
        if(benefitId){
            router.push({ pathname:`/${universitySiglaId}/configuration/beneficios/editar`,
             query:{benefitId:benefitId}}) 
        }

    }

    const onDeleteClickHandler = async() =>{
        const result = await fetch(`/api/configuration/${universitySiglaId}/benefits/${props.id}`,{
            method:'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });
        if(!result.ok){
            dispatch(uiActions.showNotification({show:true, message:'No se pudo eliminar el Beneficio, por favor intentelo en unos minutos.', color:"red"}))
        }else{
            dispatch(uiActions.showNotification({show:true, message:'Eliminación exitosa.', color:"green"}));
            router.push(`/${universitySiglaId}/configuration/beneficios`);
        }
    }   
    

    return(
        <div className={classes.box} style={{...props.additionalStyle}}>
            <div className={classes.imageContainer}>
                {props.image}
                <div className={classes.CrudToolBarContainer}>
                    <CrudToolBar onEditHandler={onEditClickHandler} onDeleteHandler={onDeleteClickHandler} />
                </div>
            </div>
            <div className={classes.PageHeader}>
                <div className={classes.SectionTitle}>Cabecera:</div>
                <div className={classes.sectionContent}>{props.pageHeader}</div>
            </div>
            <div className={classes.ExclusiveComunication}>
                <div className={classes.SectionTitle}>Comunicación de exclusividad:</div>
                <div className={classes.sectionContent}>{props.exclusiveComunication}</div>
            </div>
            <div className={classes.titleContainer}>
                <div className={classes.title}>{props.title}</div>
            </div>
            <div className={classes.DescriptionContainer}>
                <div className={classes.SectionTitle}>Descripción:</div>
                <div className={classes.sectionContent}>{props.description}</div>
            </div>
           
            <div className={classes.CardsSectionContainer}>
                <div className={classes.ValiditySectionContainer}>
                    <CardSection type="validity" validityFrom={props.validityFrom} validityTo={props.validityTo} title={'Validez'}/>
                    
                </div>
                <div className={classes.TermSectionContainer}>
                     <CardSection type="term" term={`${props.term} horas`} title={'Duración al recibir'}/>
                </div>
                <div className={classes.TermSectionContainer}>
                     <CardSection type="places" places={`${props.places}`} title={'Plazas'}/>
                </div>
                <div className={classes.TermSectionContainer}>
                     <CardSection type="rewards" rewardForSharing={props.rewardForShare} rewardForRegistration={props.rewardForRegistration} title={'Premios'}/>
                </div>
            </div>
            <div className={classes.LandingTitleContainer}>
                <h3>Landing</h3>
            </div>
            <div className={classes.LandingSection}>
                <div className={classes.LandingSectionTitle}>{'Institucional'}</div>
                {props.landing_sections.section1_title ? <FaCheckCircle className={classes.LandingSectionMark}/> : <FaTimesCircle className={classes.LandingSectionMark} />}
                <div className={classes.LandingSectionTitle}>{'De la Carrera'}</div>
                {props.landing_sections.section2_title ? <FaCheckCircle className={classes.LandingSectionMark}/> : <FaTimesCircle className={classes.LandingSectionMark} />}
                <div className={classes.LandingSectionTitle}>{'Testimonios'}</div>
                {props.landing_sections.section3_title ? <FaCheckCircle className={classes.LandingSectionMark}/> : <FaTimesCircle className={classes.LandingSectionMark} />}

            </div>

           
                    
            
            
            
        </div>
    )
}

export default memo(Card);