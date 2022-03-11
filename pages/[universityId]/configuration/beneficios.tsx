import React, { Fragment, useEffect } from "react";

import BenefitForm from "../../../components/UI/Configuration/BenefitForm";
import BenefitInterface from '../../../data/Configuration/Benefit-interface';
import Button from "../../../components/UI/Button";
import LandingSections from "../../../components/UI/Configuration/LandingSections";
import SeccionHeader from "../../../components/UI/SeccionHeader";
import classes from '../../../styles/Beneficios.module.css';
import classesSpinner from '../../../styles/spinner.module.css';
import {getSession} from 'next-auth/client';
import { uiActions } from "../../../store/ui-slice";
import { useAppDispatch } from "../../../hooks/store-hooks";
import useHttp from "../../../hooks/use-http";
import {useRouter} from 'next/router';
import {useState} from 'react';

const Beneficios = (props:BenefitInterface) => {
    const [showForm1, setShowForm1] = useState(false);
    const [showLandingSections, setShowLandingSections] = useState(false);   
    const [benefitsChanged, setBenefitsChanged] = useState(true);
    const [benefits, setBenefits] = useState(Array<BenefitInterface>());
    const {loading, error, getDataRequest} = useHttp(); 
    const [pageLoading, setPageLoading] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {universityId} = router.query; 

    useEffect(
        () =>{
            getSession().then(
                (session) => {
                    if(session){
                        setPageLoading(false);
                        
                    }else{
                        setPageLoading(true);
                        // router.push('/login');
                        window.location.href = '/login';
                    }
                }
            )
        },[])
    
    

    useEffect(() =>{
        
        const getBenefitsData = async() =>{
                const benefits = await getDataRequest(`/api/configuration/${universityId}/benefits`);
                console.log('Returned benefits:', benefits);
                setBenefits(benefits); 
                // setBenefitsChanged(false);
        }

        try{
            universityId ? getBenefitsData(): '';
        }catch(error:any){
            console.log('Ocurrio un error!');
        }

    },[universityId]);

    //useEffect for error on data fetching
    useEffect(
        () => {
            if(error.state){
                dispatch(uiActions.showNotification({show:true, message:error.message}));
            }
        },[error, dispatch])
    
    
    const onNewBenefitHandler = (e:React.MouseEvent<HTMLButtonElement>) =>{
        setShowForm1(!showForm1);
        setShowLandingSections(false);
    }

    
    
    
    const  onCreatedBenefit = () =>{
        setBenefitsChanged(true);
        setShowForm1(false);
        setShowLandingSections(true);
    }

    const onSubmitLandingSections = (e:React.SyntheticEvent) =>{
        e.preventDefault();
        //Send form to server
        setShowLandingSections(false);

    }

    return(
        <Fragment>
            {(loading || pageLoading) && <div className={classesSpinner['lds-dual-ring']}></div>}
            <SeccionHeader 
                titleText={'Configuración'} 
                number={3} 
                subTitleText={'Beneficios Digitales'}  
                explanationText={''}/>  

            <div className={classes.nuevoBeneficioButton}>
                        <Button 
                        onClickHandler={onNewBenefitHandler}
                        classOfButton="borderButton" 
                        label="Nuevo Beneficio" 
                        additionalStyle={{color:"black",paddingLeft:"2rem", paddingRight:"2rem", width:"auto"}} />
            </div>
            {showForm1 &&  <BenefitForm sentDataCorrectly={onCreatedBenefit}/>}
            {showLandingSections && <LandingSections submitHandler={onSubmitLandingSections} />}

        </Fragment>
    
    
    )
}

export default Beneficios;