import Campaign, { CampaignType } from "../../../data/Configuration/Campaign";
import CampaignParametersForm, { CampaignParameters } from "./CampaignParametersForm";
import { Fragment, useEffect, useRef, useState } from "react";
import RewardCampaignParameters, { RewardParameters } from "./RewardCampaignParameters";
import { useAppDispatch, useAppSelector } from "../../../hooks/store-hooks";

import BasicCard from "../../Layout/BasicCard";
import Benefit from "../../../data/Configuration/Benefit";
import BenefitCard from "../../Layout/BenefitCard";
import BenefitList from "./BenefitList";
import Button from "../Button";
import Image from 'next/Image';
import ModalContainer from "../../Layout/ModalContainer";
import classes from './CampaignForm.module.css';
import { configurationActions } from "../../../store/configuration-slice";
import { fetchAuthData } from "../../../store/auth-actions";
import { loadBenefits } from "../../../store/configuration-actions";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export interface CampaignFormProps{
    campaignType:CampaignType;
    title:string;
    universitySigla:string;
}
const CampaignForm = (props:CampaignFormProps) =>{
    const [iteration, setIteration] = useState(1);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const selectedBenefit:Benefit = useAppSelector(state => state.configuration.selectedBenefit);
    const campaignToCreate = useRef<Campaign>({} as Campaign);

    const onBenefitSelectionClickHandler = () =>{
        
        dispatch(configurationActions.setBenefitSelectionCaller(`/${props.universitySigla}/configuration/campanas/nueva`));
        router.push({
            pathname:`/${props.universitySigla}/configuration/beneficios`,
            query:{selection:true}
        })
    }

    const onNextClickHandler = (iterationParameter:number) =>{
        if(iterationParameter === 1){
            //Save selected Benefit
            campaignToCreate.current.benefit = String(selectedBenefit._id); 
            campaignToCreate.current.image_url = selectedBenefit.image_frontEnd;
            campaignToCreate.current.image_width = selectedBenefit.image_width;
            campaignToCreate.current.image_height = selectedBenefit.image_height;
            setIteration(2);
        }
        
    }

    const onNextCampaignParametersClickHandler = (parameters:CampaignParameters) =>{
        campaignToCreate.current.startDate = parameters.startDay;
        campaignToCreate.current.endDate = parameters.endDay;
        campaignToCreate.current.term = parameters.term;
        campaignToCreate.current.places = parameters.places;
        setIteration(3);
        

    }

    const onNextRewardsCampaignParametersHandler = (parameters:RewardParameters) =>{
        campaignToCreate.current.rewardForSharing = parameters.rewardForSharing;
        campaignToCreate.current.rewardForRegistration = parameters.rewardForRegistration;
        setIteration(4);
    }

    const benefitIsValid = (benefit:Benefit) =>{
        if(benefit && benefit._id && benefit._id.length > 0){
            return true;
        }else{
            return false;
        }
    }
    const enableNextButtonForBenefit = benefitIsValid(selectedBenefit);
    
    return(
        <Fragment>
        <h4>{props.title}</h4>
        <div className={classes.container}>
            <div className={classes.benefitSection}>
                <div className={classes.titleContainer}>
                    <div className={`${classes.iterationNumberContainer}`}>
                        <h4 className={`${classes.iterationNumber}`}>1</h4>
                    </div>
                    <h5 className={classes.sectionTitle}>Beneficio</h5>
                </div>
                {iteration === 1 && 
                    <Fragment>
                        <Button 
                            isAvailable={true}
                            label='Seleccionar' 
                            onClickHandler={onBenefitSelectionClickHandler}
                            additionalStyle={{backgroundColor:"var(--primary-color)", 
                            color:"var(--on-primary-text-color)", 
                            marginTop:"16px",
                            marginBottom:"16px",
                            width:"100%", height:"49px"}} />
                        <BasicCard>
                            {!selectedBenefit || !selectedBenefit.image_frontEnd && <p className="caption" style={{textAlign:"center", verticalAlign:"middle"}}>No tienes un Beneficio cargado</p>}
                            {selectedBenefit && selectedBenefit.image_frontEnd && 
                            <BenefitCard 
                                _id={String(selectedBenefit._id)}
                                image_url={selectedBenefit.image_frontEnd}
                                image_width={selectedBenefit.image_width}
                                image_height={selectedBenefit.image_height}
                                title={selectedBenefit.title}
                                description={selectedBenefit.description}
                                benefitHeader={selectedBenefit.pageHeader}
                                benefitExclusiveCommunication={selectedBenefit.exclusiveComunication}
                                selection={false}
                                onBenefitSelected={() => {}}
                            
                            />
                            }
                            
                        </BasicCard>
                        <Button label='Siguiente' 
                            isAvailable={!enableNextButtonForBenefit}
                            onClickHandler={onNextClickHandler(1)}
                            additionalStyle={{backgroundColor:"var(--secondary-color)", 
                            color:"var(--on-secondary-text-color)", 
                            marginTop:"16px",
                            marginBottom:"16px",
                            width:"100%", height:"49px"}} />
                        
                    </Fragment>
                }
                <div className={classes.titleContainer}>
                    <div className={`${classes.iterationNumberContainer}`}>
                        <h4 className={`${classes.iterationNumber}`}>2</h4>
                    </div>
                    <h5 className={classes.sectionTitle}>Parámetros de la Campaña</h5>
                </div>
                {iteration === 2 && 
                    
                        <CampaignParametersForm onNextClickHandler={onNextCampaignParametersClickHandler}/>
                   
                
                
                }
                <div className={classes.titleContainer}>
                    <div className={`${classes.iterationNumberContainer}`}>
                        <h4 className={`${classes.iterationNumber}`}>3</h4>
                    </div>
                    <h5 className={classes.sectionTitle}>Premios</h5>
                </div>
                {iteration ===3 && 
                    <RewardCampaignParameters onNextClickHandler={onNextRewardsCampaignParametersHandler}></RewardCampaignParameters>
                
                
                }
                <div className={classes.titleContainer}>
                    <div className={`${classes.iterationNumberContainer}`}>
                        <h4 className={`${classes.iterationNumber}`}>4</h4>
                    </div>
                    <h5 className={classes.sectionTitle}>Landing</h5>
                </div>
                {iteration === 4 && 
                    <Fragment>
                        <Button label='Seleccionar' 
                        onClickHandler={onBenefitSelectionClickHandler}
                        additionalStyle={{backgroundColor:"var(--primary-color)", 
                        color:"var(--on-primary-text-color)", 
                        marginTop:"16px",
                        marginBottom:"16px",
                        width:"100%", height:"49px"}} />
                        <BasicCard>

                        </BasicCard>
                    </Fragment>
                
                }

            </div>

        </div>
        </Fragment>
    )
}

export default CampaignForm;