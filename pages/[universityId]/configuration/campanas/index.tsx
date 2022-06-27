import Campaign, { CampaignType } from '../../../../data/Configuration/Campaign';
import { Fragment, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/store-hooks';

import CampaignList from '../../../../components/UI/Configuration/CampaignList';
import CampaignResume from '../../../../data/Configuration/CampaignResume';
import { fetchAuthData } from '../../../../store/auth-actions';
import spinnerClasses from '../../../../styles/spinner.module.css';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

//Test Data
const campaignsData = [
    {
        "id":"1",
        "name":"Año lectivo 2022",
        "type":CampaignType.MATRICULATION,
        "startDate":"01/05/2022",
        "endDate":"30/05/2022",
        "benefit":"1",
        "image_url":"/ucsa/image1-Section1-14-4-2022-1652573853397.jpeg",
        "image_width":120,
        "image_height":90,
        "term":72,
        "places":100,
        "rewardForSharing":0,
        "rewardForRegistration":100000,
        "landing":"1"

    },
    {
        "id":"2",
        "name":"Medicina 2022",
        "type":CampaignType.MATRICULATION,
        "startDate":"01/05/2022",
        "endDate":"30/05/2022",
        "benefit":"1",
        "image_url":"/ucsa/image2-Section1-19-4-2022-1653004692498.jpeg",
        "image_width":120,
        "image_height":90,
        "term":72,
        "places":100,
        "rewardForSharing":0,
        "rewardForRegistration":100000,
        "landing":"1"

    }
]


export interface CampanasProps{
    campaigns:Array<Campaign>;
    activeCampaigns:number;
    matriculation_campaigns:number;
    specializations_campaigns:number;
    course_campaigns:number;
    effectivity:number;
}
const testData:CampanasProps = {
    campaigns: campaignsData,
    activeCampaigns:10,
    matriculation_campaigns:5,
    specializations_campaigns:2,
    course_campaigns:3,
    effectivity:0.23
}

const Campanas = (props:CampanasProps) =>{
    const {data:session, status} = useSession();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const universitySigla = useAppSelector(state => state.auth.university.sigla);


    useEffect(
        () =>{
            if(session && session.user && session.user?.email){
                !universitySigla ? dispatch(fetchAuthData(session?.user?.email)) : '';
            }
        },[session, dispatch, universitySigla]
    )
    
    const getCampaignResume = ():CampaignResume =>{
        return {
            active_campaigns:props.activeCampaigns,
            matriculation_campaigns:props.matriculation_campaigns,
            specializations_campaigns:props.specializations_campaigns,
            course_campaigns:props.course_campaigns,
            effectivity:props.effectivity
        }
    }

    const getCampaigns = () =>{
        // return props.campaigns ? JSON.parse(props.campaigns) : "";
    
    }
    if(status === 'authenticated'){
        return(
            
            <CampaignList resume={getCampaignResume()} campaigns={props.campaigns}  universitySigla={universitySigla}/>
            
        )
    }
    if(status === 'loading'){
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

Campanas.defaultProps = testData;

export default Campanas;