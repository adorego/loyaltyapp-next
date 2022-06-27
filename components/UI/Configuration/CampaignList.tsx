import Campaign, { CampaignType } from '../../../data/Configuration/Campaign';
import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';

import BasicCard from '../../Layout/BasicCard';
import Button from "../Button";
import CampaignResume from "../../../data/Configuration/CampaignResume"
import Image from 'next/Image';
import ModalContainer from '../../Layout/ModalContainer';
import classes from './CampaignList.module.css';
import { configurationActions } from '../../../store/configuration-slice';
import { useRouter } from 'next/router';
import { useState } from 'react';

export interface CampaignListProps{
    campaigns:Array<Campaign>;
    resume:CampaignResume;
    universitySigla:string
}
const CampaignList = (props:CampaignListProps) =>{
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();
    

    const onNewCampaignClickHandler = () =>{
        setShowModal(true);
    }
    const onModalCloseClickHandler = () =>{
        setShowModal(false);
    }
    const onFirstButtonClick = () =>{
        dispatch(configurationActions.setCampaignType(CampaignType.MATRICULATION));
        router.push(`/${props.universitySigla}/configuration/campanas/nueva`);
    }
    const onSecondButtonClick = () =>{
        dispatch(configurationActions.setCampaignType(CampaignType.SPECIALIZATION));
        router.push(`/${props.universitySigla}/configuration/campanas/nueva`);
    }
    const onThirdButtonClick = () =>{
        dispatch(configurationActions.setCampaignType(CampaignType.COURSE));
        router.push(`/${props.universitySigla}/configuration/campanas/nueva`);
    }
    return(
        <div className={classes.container}>
            {showModal && <ModalContainer closeCallBack={onModalCloseClickHandler}
                            additionalStyle={{paddingTop:"10%", paddingLeft:"10%", paddingRight:"10%", margin:"auto"}}>
                        <div className={classes.modalContainer}>       
                            <h4>Seleccioná el tipo de Campaña</h4>
                            <Button 
                            isAvailable={true}
                            additionalStyle={{backgroundColor:"var(--primary-color)", 
                            color:"var(--on-primary-text-color)", 
                            width:"100%", height:"auto", margin:"0px 0px 16px 0px "}} 
                            label="Campaña de Matriculación General" 
                            onClickHandler={onFirstButtonClick} ></Button>
                            <Button 
                            isAvailable={true}
                            additionalStyle={{backgroundColor:"var(--primary-color)", 
                            color:"var(--on-primary-text-color)", 
                            width:"100%", height:"auto", margin:"0px 0px 16px 0px "}} 
                            label="Campaña de Matriculación a Especialización" 
                            onClickHandler={onSecondButtonClick} ></Button>
                            <Button 
                            isAvailable={true}
                            additionalStyle={{backgroundColor:"var(--primary-color)", 
                            color:"var(--on-primary-text-color)", 
                            width:"100%", height:"auto", margin:"0px 0px 16px 0px "}} 
                            label="Campaña de Matriculación a Curso" 
                            onClickHandler={onThirdButtonClick} ></Button>
                        </div> 
                
                </ModalContainer>}
            
            <div className={classes.buttonContainer}>
                <Button label='Nueva Campaña' 
                    isAvailable={true}
                    onClickHandler={onNewCampaignClickHandler}
                    additionalStyle={{backgroundColor:"var(--primary-color)", 
                    color:"var(--on-primary-text-color)", 
                    width:"150px", height:"49px"}} />
            </div>
            {props.campaigns && 
                <div className={classes.listContainer}>
                    <BasicCard>
                        <h4 className={classes.resumeCardTitle}>Campañas</h4>
                        <div className={classes.resumeCardContainer}>
                            <div className={classes.resumeCardListSection}>
                                <p className='body2'>Campañas activas: {props.resume.active_campaigns}</p>
                                <p className='body2'>Campañas de Matriculación: {props.resume.matriculation_campaigns}</p>
                                <p className='body2'>Campañas de Especializaciones: {props.resume.specializations_campaigns}</p>
                                <p className='body2'>Campañas de Cursos: {props.resume.course_campaigns}</p>
                            </div>
                            <div className={classes.resumeCardEffectivitySection}>
                                <h2 className={classes.resumeCardEffectivity}>{props.resume.effectivity * 100} %</h2>
                                <p className='subtitle1' style={{color:"var(--secondary-color)"}}>Efectividad</p>
                            </div>
                        </div>
                    </BasicCard>
                    {props.campaigns.map(
                        (campaign) =>{
                            return(
                                <BasicCard key={campaign.id}>
                                    <div className={classes.campaignCardContainer}>
                                        <div className={classes.campaignCardImage}>
                                            <Image src={campaign.image_url} 
                                            layout={'responsive'} 
                                            alt={'Campaign Image'} 
                                            priority={true}
                                            width={campaign.image_width} 
                                            height={campaign.image_height}/>
                                        </div>
                                        <div className={classes.campaignCardInfoContainer}>
                                            <div className={classes.campaignCardInfo}>
                                                <p className='body2'>Campaña: {campaign.name}</p>
                                                <p className='body2'>Tipo: {CampaignType[campaign.type]}</p>
                                                <p className='body2'>Inicio: {campaign.startDate}</p>
                                                <p className='body2'>Fin: {campaign.endDate}</p>
                                            </div>
                                            <div className={classes.campaignCardActions}>
                                                <p className='body2' style={{color:"var(--secondary-color)"}}>Previsualizar</p>
                                            </div>
                                        </div>
                                    </div>
                                </BasicCard>
                            )
                        }
                    )}
                </div>
            }
        </div>
    )
}

export default CampaignList;