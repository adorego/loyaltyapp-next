import { BENEFITS, LANDING_TEMPLATES, UNIVERSITIES } from "../../../../helpers/collectionNames";
import { GetServerSideProps, NextApiResponse } from "next";
import React, { Fragment } from "react";
import errorHandler, { errorNextHandler } from "../../../../helpers/errorHandler";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store-hooks";

import BenefitList from "../../../../components/UI/Configuration/BenefitList";
import connect from "../../../../dataBase/dataBase";
import { fetchAuthData } from "../../../../store/auth-actions";
import spinnerClasses from '../../../../styles/spinner.module.css';
import {useRouter} from 'next/router';
import {useSession} from 'next-auth/react';

export interface BeneficiosProps{
    benefits:string;
}
const Beneficios = (props:BeneficiosProps) => {
    
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {data:session, status} = useSession();
    const universitySiglaId = useAppSelector(state => state.auth.university.sigla);
    const {selection:setSelection} = router.query;
    const benefitSelectionCaller = useAppSelector(state => state.configuration.benefitSelectionCaller);
   
    const onBenefitSelectedHandler = () =>{
        console.log('benefitSeletedHandler:', benefitSelectionCaller);
        if(benefitSelectionCaller.length > 0){
            router.push(benefitSelectionCaller);
        }
    }
    
    const parse_exclusive_communication = (originalText:string) =>{
        const finalText = originalText ? originalText.replace(/prospecto/i,'Gabriel Perez').replace(/promotor/,'Edgar Gimenez') : '';
        return (finalText);
    }
    

    
    
    if(status === 'authenticated'){
        if(!universitySiglaId){
            session && session.user && session.user.email ? dispatch(fetchAuthData(session.user?.email)) : '';
        }
        // console.log('benefits:', props.benefits);
        return(
           <BenefitList benefits={JSON.parse(props.benefits)} 
            selection={Boolean(setSelection) ? Boolean(setSelection) : false} 
            oBenefitSelected={onBenefitSelectedHandler}
            />
        
        
        )
    }

    if(status === 'loading' || !universitySiglaId){
        return(
            <div className={spinnerClasses["lds-dual-ring "]}></div>
        )
    }
    if(status === 'unauthenticated'){
        router.push('/login');
        return(
            <div className={spinnerClasses["lds-dual-ring "]}></div>
        )
    }
}

export default Beneficios;



export const getServerSideProps:GetServerSideProps = async({query, req, res}) =>{
    const {universityId:universitySiglaId} = query;

    const dbClient = await connect();
    try{
        if(dbClient){
            const db = dbClient?.db();
            const universityCollection = db.collection(UNIVERSITIES);
            const university = await universityCollection.findOne({sigla:universitySiglaId});
            const benefitsCollection = db.collection(BENEFITS);
            const benefits = await benefitsCollection.find({university_id:university?._id}).toArray();
            const modifiedBenefits = await addLandingSections(benefits, db, res);
            // console.log('Modified benefits:', modifiedBenefits);
            
            return{
                props:{
                    benefits:JSON.stringify(modifiedBenefits)
                }
            }
        }else{
            return errorNextHandler({message:"Error al buscar los beneficios."}, res);
        }
    }
    catch(error:any){
        return errorNextHandler(error, res);

    }
    finally{
        dbClient?.close();
    }

}

const addLandingSections = async (benefits:any, db:any, res:any) =>{
    
    const options = {
        projection:{'section1_title':'', 'section2_title':'', 'section3_title':''}
    }
    const landingTemplateCollection = db.collection(LANDING_TEMPLATES);

    for(let benefit of benefits){
        try{
            const landing_sections = await landingTemplateCollection.findOne({_id:benefit.landing_template_id}, options);
            // console.log('landing_sections:', landing_sections);
            benefit.landing_sections = {
                        ...landing_sections
                    }
            // console.log('Benefit:', benefit);
        }catch(error:any){
            return errorNextHandler(error, res);
        }
    }
    
   
    return benefits;
}