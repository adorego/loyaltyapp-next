import { useAppDispatch, useAppSelector } from "../../../../hooks/store-hooks";

import CampaignForm from "../../../../components/UI/Configuration/CampaignForm";
import { CampaignType } from "../../../../data/Configuration/Campaign";
import { fetchAuthData } from "../../../../store/auth-actions";
import spinnerClasses from '../../../../styles/spinner.module.css';
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export interface CampanaNuevaProps{

}
const CampanaNueva = (props:CampanaNuevaProps) =>{
    const {data:session, status} = useSession();
    const universitySigla = useAppSelector(state => state.auth.university.sigla);
    const selectedCampaignType = useAppSelector<CampaignType>(state => state.configuration.selectedCampaignType);
    const dispatch = useAppDispatch();
    const router = useRouter();

    
    useEffect(
        () =>{
            if(session && session.user && session.user?.email){
                !universitySigla ? dispatch(fetchAuthData(session?.user?.email)) : '';
            }
        },[session, dispatch, universitySigla]
    )

    if(status === 'authenticated'){
        
        if(selectedCampaignType === CampaignType.MATRICULATION){
            return(
                <CampaignForm 
                campaignType={CampaignType.MATRICULATION} 
                title={'Nueva Campaña de Matriculación General'} 
                universitySigla={universitySigla}
                />
            )
        }
        if(selectedCampaignType === CampaignType.SPECIALIZATION){
            return(
                <CampaignForm 
                campaignType={CampaignType.SPECIALIZATION} 
                title={'Nueva Campaña de Matriculación a Especialización'} 
                universitySigla={universitySigla}
                />
            )
        }
        if(selectedCampaignType === CampaignType.COURSE){
            return(
                <CampaignForm 
                campaignType={CampaignType.COURSE} 
                title={'Nueva Campaña de Matriculación a Curso'} 
                universitySigla={universitySigla}
                />
            )
        }
    }

    if(status === 'loading'){
        return(
            <div className={spinnerClasses["lds-dual-ring "]}></div>
        )
    }
    if(status === 'unauthenticated'){
        {router.push('/login')}
        return <div className={spinnerClasses["lds-dual-ring"]}></div>
        
    }
}
export default CampanaNueva;