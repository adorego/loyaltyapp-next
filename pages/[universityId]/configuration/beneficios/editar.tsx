import { BENEFITS, UNIVERSITIES } from "../../../../helpers/collectionNames";

import Benefit from "../../../../data/Configuration/Benefit";
import BenefitForm from "../../../../components/UI/Configuration/BenefitForm";
import { Fragment } from "react";
import { GetServerSideProps } from "next";
import { ObjectId } from "mongodb";
import SeccionHeader from "../../../../components/UI/SeccionHeader";
import connect from "../../../../dataBase/dataBase";
import { errorNextHandler } from "../../../../helpers/errorHandler";
import spinnerClasses from '../../../../styles/spinner.module.css';
import { uiActions } from "../../../../store/ui-slice";
import { useAppDispatch } from "../../../../hooks/store-hooks";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export interface EditarBeneficioProps{
    toEditBenefit:string;
}

const EditarBeneficio = (props:EditarBeneficioProps) =>{
    const {data:session, status} = useSession();
    const router = useRouter();
    const {universityId:universitySiglaId} = router.query;
    const toEditBenefit = JSON.parse(props.toEditBenefit);
    const dispatch = useAppDispatch();
   

    const onEditSubmit = async (editedBenefit:FormData) =>{
        const result = await fetch(`/api/configuration/${universitySiglaId}/benefits/${toEditBenefit._id}`,{
            method:'PUT',
            body:editedBenefit
        });
        const data = await result.json();
        console.log('Data:', data);
        if(!result.ok){
            dispatch(uiActions.showNotification({show:true, message:'No se pudo actualizar el Beneficio, por favor intentelo en unos minutos.', color:"red"}))
        }else{
            dispatch(uiActions.showNotification({show:true, message:'Actualización exitosa.', color:"green"}))
        }
    }
    
    if(status === 'authenticated'){
        return(
            <Fragment>
                <SeccionHeader titleText='' />
                <BenefitForm edit={true} sendNewBenefit={onEditSubmit} benefitValue={toEditBenefit} title={'Editar Beneficio'} />
            </Fragment>
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

export default EditarBeneficio;

export const getServerSideProps:GetServerSideProps = async({query, req, res}) =>{
    const {benefitId} = query;

    console.log('benefitId:', benefitId);
    const dbClient = await connect();
    try{
        if(dbClient){
            const db = dbClient?.db();
            const benefitCollection = db.collection(BENEFITS);
            const benefit = await benefitCollection.findOne({_id:new ObjectId(String(benefitId))});
            
            return{
                props:{
                    toEditBenefit:JSON.stringify(benefit)
                }
            }
        }else{
            return errorNextHandler({message:"Error al buscar los beneficios."}, res);
        }
    }catch(error:any){
        return errorNextHandler({message:"Error al buscar los beneficios."}, res);

    }finally{
        dbClient?.close();
    }

}