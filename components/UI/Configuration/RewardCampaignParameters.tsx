import Button from '../Button';
import Input from '../Input';
import classes from './RewardCampaignParameters.module.css';
import useInput from '../../../hooks/use-input';

export interface RewardParameters{
    rewardForSharing:number;
    rewardForRegistration:number;
}
export interface RewardCampaignParametersProps{
    onNextClickHandler:(rewardParameters:RewardParameters) => void;
}
const RewardCampaignParameters = (props:RewardCampaignParametersProps) =>{
    
    //Reward for sharing Input Definition
    const validateCampaignRewardForSharing = (value:string) =>{
        const empty = value === '';

        if(empty){
            return{
                pass:false,
                errorMessage:'Este valor no puede estar vacio'
            }
        }else{
            return{
                pass: true,
                errorMessage:''
            }
        }
    }
    const {value:campaignRewardForSharingValue, 
        onChangeHandler:onChangeCampaignRewardForSharingHandler, 
        onBlurHandler:onBlurCampaignRewardForSharingHandler,
        isInputInvalid: isInputCampaignRewardForSharingInvalid,
        errorMessage:errorMessageCampaignRewardForSharing,
        onFocus:onFocusCampaignRewardForSharing} = useInput(validateCampaignRewardForSharing, 
            "");
    //Reward for sharing Input Definition
    const validateCampaignRewardForRegistration = (value:string) =>{
        const empty = value === '';

        if(empty){
            return{
                pass:false,
                errorMessage:'Este valor no puede estar vacio'
            }
        }else{
            return{
                pass: true,
                errorMessage:''
            }
        }
    }
    const {value:campaignRewardForRegistrationValue, 
        onChangeHandler:onChangeCampaignRewardForRegistrationHandler, 
        onBlurHandler:onBlurCampaignRewardForRegistrationHandler,
        isInputInvalid: isInputCampaignRewardForRegistrationInvalid,
        errorMessage:errorMessageCampaignRewardForRegistration,
        onFocus:onFocusCampaignRewardForRegistration} = useInput(validateCampaignRewardForRegistration, 
            "");
            const onNextClickHandler = () =>{
                console.log('Click Next Button');
                props.onNextClickHandler({
                    rewardForSharing:Number(campaignRewardForSharingValue),
                    rewardForRegistration:Number(campaignRewardForRegistrationValue),
                    
                })
            }
    const enableNextButton = !isInputCampaignRewardForSharingInvalid 
                             && !isInputCampaignRewardForRegistrationInvalid;
                                    

    return(
        <div className={classes.container}>
            <div className={classes.rewardForSharingContainer}>
                <Input 
                    id="rewardForSharingId"
                    label="Premio por Compartir el Beneficio" 
                    helpMessage='Monto de dinero a acreditar al Promotor Digital por compartir el Beneficio con su red'
                    value={campaignRewardForSharingValue} 
                    onChangeHandler={onChangeCampaignRewardForSharingHandler}
                    onBlurHandler={onBlurCampaignRewardForSharingHandler}
                    onFocusHandler={onFocusCampaignRewardForSharing}
                    isInputInvalid={isInputCampaignRewardForSharingInvalid}
                    errorMessage={errorMessageCampaignRewardForSharing}
                    additionalAttributes={{type:"number", autoComplete:"off"}}/>
            </div>
            <div className={classes.rewardForRegistrationContainer}>
                <Input 
                    id="rewardForRegistrationId"
                    label="Premio por Matriculación" 
                    helpMessage='Monto de dinero a acreditar al Promotor Digital una vez matriculado su Referido'
                    value={campaignRewardForRegistrationValue} 
                    onChangeHandler={onChangeCampaignRewardForRegistrationHandler}
                    onBlurHandler={onBlurCampaignRewardForRegistrationHandler}
                    onFocusHandler={onFocusCampaignRewardForRegistration}
                    isInputInvalid={isInputCampaignRewardForRegistrationInvalid}
                    errorMessage={errorMessageCampaignRewardForRegistration}
                    additionalAttributes={{type:"number", autoComplete:"off"}}/>
            </div>
            <div className={classes.nextButtonContainer}>
                <Button label='Siguiente' 
                    disabled={!enableNextButton}
                    onClickHandler={onNextClickHandler}
                    additionalStyle={{backgroundColor:"var(--secondary-color)", 
                    color:"var(--on-secondary-text-color)", 
                    marginTop:"16px",
                    marginBottom:"16px",
                    width:"100%", height:"49px"}} />
            </div>
        </div>
    )
}

export default RewardCampaignParameters;